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

#### Question 4: Creating a function -------------------------------------------

# Step 1: Specify your function with one argument, data
calculate_IAT_dscore <- function(data) {
  
  # Step 2: Only select trials with rt > 300 & < 5000 (subset full data frame into new data frame called tmp)
  tmp <- data[data$rt > 300 & data$rt < 5000, ]
  
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

#### Question 5: Putting it in a loop & creating new files ---------------------

## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* contain your raw participant csv data files and no other files.
directory_path <- "~/Desktop/psy1903/osfstorage-archive"

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

## Create an empty data frame called dScores that has two columns & as many rows as you have data files (e.g., participants)
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 2))

## Rename the default column names to something meaningful
colnames(dScores) <- c("participant_ID", "d_score")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

## Initiate a for loop that iterates across each file in files_list
for (file_list in files_list) {
  
  # Use read.csv to read in your file as a temporary data frame
  tmp <- read.csv(file_list)

  # Convert 'rt' from character to numeric and round it
  tmp$rt <- round(as.numeric(tmp$rt), 0)
  
  # Check for NAs (non-numeric values) and handle them
  if (any(is.na(tmp$rt))) {
    warning(paste("NAs introduced by coercion in participant", tools::file_path_sans_ext(basename(file_list))))
  }
  
  # Assign participant_ID as the base name of the file
  participant_ID <- tools::file_path_sans_ext(basename(file_list))
  
  # Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i, "participant_ID"] <- participant_ID
  
  # Isolate the d_score column for the current row number (i) and assign it to be the current d-score by using calculate_IAT_dscore on the tmp data file
  dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
  
  # Remove the temporary data file tmp
  rm(tmp)
  
  # Increase our row number variable i by one for the next iteration
  i <- i + 1
}

## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

#### Questionnaire Scoring -----------------------------------------------------

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