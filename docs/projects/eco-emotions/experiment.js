let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the experiment!</h1> 
    <p>In this experiment, you will complete the following three tasks:</p>
    <ul class='list'>
      <li>In Task 1, you will watch a short video.</li>
      <li>In Task 2, you will categorize a series of words.</li>
      <li>In Task 3, you will answer a brief set of questions.</li>
    </ul>
    <p>Press the <span class='key'>SPACE</span> key to begin Task 1.</p>
    `,
    choices: [' '],
};

// timeline.push(welcomeTrial);

// Priming
let videos = [
    { name: 'climate-anxiety', embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/QHH3iSeDBLo?si=l2aaso7D6oZiZcHX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { name: 'school-anxiety', embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Okrqwbt-TlI?si=1RgCHdzm45NmiQLc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    { name: 'neutral', embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/pLVpJAVS27A?si=epz0_j1lHlWfLihe&amp;start=30" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
];

let videoCondition = jsPsych.randomization.sampleWithoutReplacement(videos, 1)[0].embed;

let primingTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Task 1 of 3</h1>
    <p>In this task, you will watch the following video. Please press the video to begin. You will automatically proceed to Task 2 once the video ends.</p>
    ${videoCondition}
    `,
    trial_duration: 78000,
    choices: ['NO KEYS'],
    data: {
        collect: true,
    }
};

timeline.push(primingTrial);

// IAT


// Questionnaire
let likert_scale = [
    "Never",
    "Rarely",
    "Sometimes",
    "Often",
    "Almost always"
];

let likertSurvey = {
    type: jsPsychSurveyLikert,
    preamble: `
    <h1 class='taskHeading'>Task 3 of 3</h1> 
    <p>Please answer the following 10 questions.</p>
    `,
    button_label: 'Submit',
    questions: [
        { prompt: "Thinking about climate change makes it difficult for me to concentrate.", labels: likert_scale },
        { prompt: "Thinking about climate change makes it difficult for me to sleep.", labels: likert_scale },
        { prompt: "My concerns about climate change make it hard for me to have fun with my family or friends.", labels: likert_scale },
        { prompt: "My concerns about climate change undermine my ability to work to my potential.", labels: likert_scale },
        { prompt: "My friends say I think about climate change too much.", labels: likert_scale },
        { prompt: "I have noticed a change in a place that is important to me due to climate change.", labels: likert_scale },
        { prompt: "I wish I behaved more sustainably.", labels: likert_scale },
        { prompt: "I recycle.", labels: likert_scale },
        { prompt: "I try to reduce my behaviors that contribute to climate change.", labels: likert_scale },
        { prompt: "I feel guilty if I waste energy.", labels: likert_scale },
    ]
};

// timeline.push(likertSurvey);

jsPsych.run(timeline);