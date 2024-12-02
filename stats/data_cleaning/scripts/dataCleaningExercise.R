#### Question 2: Set-up, packages, & reading in data ---------------------------

dir.create("data_cleaning")
dir.create("data_cleaning/output")
dir.create("data_cleaning/scripts")
dir.create("data_cleaning/data")

setwd("~/Desktop/psy1903/stats/data_cleaning/scripts/")

if (!require("pacman")) {install.packages("pacman"); require("pacman")}

p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite")

iat_data1 <- read.csv("~/Desktop/psy1903/osfstorage-archive/eco-emotions-2024-11-05-21-43-06.csv", header = TRUE, na.strings = "NA")

str(iat_data1)
summary(iat_data1)

#### Question 3: Subsetting data -----------------------------------------------

iat_data2 <- iat_data1[iat_data1$expectedCategoryAsDisplayed %in% c("nature or anxiety", "nature or serenity", "school or anxiety", "school or serenity"), c("trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct")]

iat_data2$rt <- round(as.numeric(iat_data2$rt), 0) # converting rt from chr to int/num

# Converting some columns to factors via a for loop
factorList <- c("expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory")

for (factorCategory in factorList) {
  iat_data2[, factorCategory] <- as.factor(iat_data2[, factorCategory])
}

str(iat_data2)
summary(iat_data2)

#### [USE] Creating a function -------------------------------------------------

# Practice: read in data
data <- read.csv("~/Desktop/psy1903/osfstorage-archive/eco-emotions-2024-11-05-21-43-21.csv", header = TRUE, na.strings = "NA")

data$rt <- round(as.numeric(data$rt), 0)

# Step 1: Specify your function with one argument, data
calculate_IAT_dscore <- function(data) {
  
  # Step 2: Only select trials with rt > 300 & < 5000 and filter correct trials (subset full data frame into new data frame called tmp)
  tmp <- data[data$rt > 300 & data$rt < 5000, ]
  tmp <- tmp[tmp$correct == TRUE, ]
  
  # Step 3: Separate congruent and incongruent trials (subset tmp into two new data frames: congruent_trials and incongruent_trials)
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "nature or serenity" | tmp$expectedCategoryAsDisplayed == "school or anxiety", ]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "nature or anxiety" | tmp$expectedCategoryAsDisplayed == "school or serenity", ]
  
  # Step 4: Calculate mean for congruent & incongruent trials (mean_congruent, mean_incongruent)
  mean_congruent <- mean(congruent_trials$rt, na.rm = TRUE)
  mean_incongruent <- mean(incongruent_trials$rt, na.rm = TRUE)
  
  # Step 5: Calculate standard deviation for all trials (pooled_sd)
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  
  # Step 6: Calculate D-score
  d_score <- (mean_incongruent - mean_congruent) / pooled_sd
  
  # Step 7: Return D-score
  return(d_score)
}

#### [USE] Questionnaire Scoring Function --------------------------------------

## Initiate function called score_questionnaire that accepts a single argument called `data`. Within this function...
score_questionnaire <- function(data) {
  
  ## Extract questionnaire data cell
  json_data <- data[data$trialType == "questionnaire", "response"]
  
  ## Use fromJSON to convert from JSON to data frame
  questionnaire <- fromJSON(json_data)
  questionnaire <- as.data.frame(questionnaire)
  str(questionnaire) # checking my work
  
  ## Convert to numeric
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  
  ## No reverse-scoring because unnecessary
  
  ## Calculate & return questionnaire score (mean)
  score <- rowMeans(questionnaire, na.rm = TRUE)
  return(score)
}

#### [USE] Putting it in a loop & creating new files ---------------------------

## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* contain your raw participant csv data files and no other files.
directory_path <- "~/Desktop/psy1903/osfstorage-archive"

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

## Create an empty data frame called dScores that has 4 columns & as many rows as you have data files (e.g., participants)
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 4))

## Rename the default column names to something meaningful
colnames(dScores) <- c("participant_ID", "d_score", "whichPrime", "questionnaireScore")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

## Initiate a for loop that iterates across each file in files_list
for (file_list in files_list) {
  
  # Use read.csv to read in your file as a temporary data frame
  tmp <- read.csv(file_list)

  # Convert 'rt' from character to numeric and round it
  tmp$rt <- round(as.numeric(tmp$rt), 0)
  
  # Convert "correct" column to logical
  tmp$correct <- as.logical(tmp$correct)
  
  # Converting some columns to factors via another for loop
  factorList <- c("expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory")
  
  for (factorCategory in factorList) {
    tmp[, factorCategory] <- as.factor(tmp[, factorCategory])
  }
  
  # Check for NAs (non-numeric values) and handle them
  if (any(is.na(tmp$rt))) {
    warning(paste("NAs introduced by coercion in participant", tools::file_path_sans_ext(basename(file_list))))
  }
  
  # Assign participant_ID as the base name of the file
  participant_ID <- tools::file_path_sans_ext(basename(file_list))
  
  # Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i, "participant_ID"] <- participant_ID
  
  # Assign the dScores "whichPrime" column to be the current participant's prime label
  dScores[i, "whichPrime"] <- tmp[tmp$trialType == "prime", "whichPrime"]
  
  # Isolate the d_score column for the current row number (i) and assign it to be the current d-score by using calculate_IAT_dscore on the tmp data file
  dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
  
  # Assign the "questionnaire" column to be the output of the score_questionnaire function
  dScores[i, "questionnaire"] <- score_questionnaire(tmp)
  
  # Remove the temporary data file tmp
  rm(tmp)
  
  # Increase our row number variable i by one for the next iteration
  i <- i + 1
}

## Change column "whichPrime" to be a factor (should have 2 or 3 levels depending on your prime)
dScores$whichPrime <- as.factor(dScores$whichPrime)

## Change "d_score" and "questionnaire" to be numbers
dScores$d_score <- as.numeric(dScores$d_score)
dScores$questionnaire <- as.numeric(dScores$questionnaire)

## Change "participant_ID" to be characters
dScores$participant_ID <- as.character(dScores$participant_ID)

## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

#### Practice Questionnaire Scoring -----------------------------------------------------

## Read in data file to a data frame called iat_test
iat_test <- read.csv("~/Desktop/psy1903/stats/data_cleaning/data/my-iat-test-data.csv")

## Extract questionnaire data
json_data <- iat_test[iat_test$trialType == "Questionnaire", "response"]

## Use fromJSON to Convert from JSON to data frame
questionnaire <- fromJSON(json_data)
questionnaire <- as.data.frame(questionnaire)
str(questionnaire)

## Convert to numeric
questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))

## Reverse score if necessary (not for me but writing code here for learning/future reference)
# rev_items <- c("question1", "question3", "whatever")
# for (rev_item in rev_items) {
  # questionnaire[, rev_item] <- (maxLikertScore + minLikertScale) - questionnaire[, rev_item]
# }

## Calculate mean or sum score
score <- rowMeans(questionnaire, na.rm = TRUE)

#### [USE] Data visualizations ---------------------------

## ANOVA
anova <- aov(d_score ~ whichPrime, data = dScores)
summary(anova)

## T-tests
TukeyHSD(anova)

## Correlation
cor.test(dScores$d_score, dScores$questionnaire)         

## Base R histogram
hist(dScores$d_score,
     main = "Distribution of D-Scores",
     xlab = "D-Scores",
     ylab = "Frequency")

## GGPlot histogram
# Version 1
ggplot(dScores, aes(x = d_score)) +
  geom_histogram(binwidth = 0.1, 
                 color = "black", 
                 fill = "skyblue") +
  labs(title = "Distribution of D-Scores",
       x = "D-Scores",
       y = "Frequency") +
  theme_minimal()

# Version 2
ggplot(dScores, aes(x = d_score)) +
  geom_histogram(binwidth = 0.1,
                 color = "black",
                 fill = "#9ab67f") +
  labs(title = "Distribution of D-Scores",
       x = "D-Scores",
       y = "Frequency") +
  green_theme() +
  facet_wrap(~whichPrime)

## Boxplot
ggplot(dScores, aes(x = whichPrime, y = d_score, fill = whichPrime)) +
  geom_boxplot() +
  labs(title = "Effect of Prime on D-Scores",
       x = "Prime Condition",
       y = "D-Scores") +
  theme_classic() +
  theme(legend.position = "none") +
  scale_x_discrete(labels = c("neutral" = "Neutral",
                              "climate-anxiety" = "Climate Anxiety",
                              "school-anxiety" = "School Anxiety"))

## Scatterplot
ggplot(dScores, aes(x = questionnaire, y = d_score)) +
  geom_point() +
  geom_smooth(method = "lm") +
  labs(title = "Correlation Between Questionnaire and D-Scores",
       x = "Questionnaire",
       y = "D-Scores") +
  theme_classic()

## Create personal theme
green_theme <- function() {
  theme_minimal() %+replace%
  theme(
    text = element_text(family = "Helvetica"), # font family
    
    # Panel borders and background
    panel.border = element_rect(colour = "#5d7843", fill = NA, linetype = 2),
    panel.background = element_rect(fill = "#e4ebdd"),
    
    # Title and axis label customization
    plot.title = element_text(size = 14, face = "bold", hjust = 0.5, vjust = 2, family = "Helvetica"),
    axis.title = element_text(size = 12, family = "Helvetica"),
    axis.text = element_text(size = 10, family = "Helvetica", color = "#3b4d36"),
    axis.ticks = element_line(color = "#3b4d36", linewidth = 0.5),
  )
}
