let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the experiment!</h1> 
    <p>This experiment is only a demo of the jsPsych 'sketchpad' plugin.</p>
    <p>Press the <span class='key'>SPACE</span> key to begin.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);

// Conditions
let promptDisplay = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p>Please draw the word shown on the next screen and continue adding detail for 40 seconds.</p>
    `,
    trial_duration: 750,
    choices: [' '],
};
timeline.push(promptDisplay);

let fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p class='fixation'>+</p>`,
    choices: ['NO KEYS'],
    trial_duration: 500
};
timeline.push(fixation);

let wordDisplay = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p>apple</p>
    `,
    trial_duration: 750,
    choices: [' '],
};
timeline.push(wordDisplay);

let encoding = {
    type: jsPsychSketchpad,
    trial_duration: 40000,
};
timeline.push(wordDisplay);

// Results
let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <span class='loader'></span>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .csv();

        console.log(results);

        let prefix = 'plugin-demo';
        let dataPipeExperimentId = 'R3IeWxvW6LgG';
        let forceOSFSave = false;
        let participantId = getCurrentTimestamp();
        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })

    }
}
timeline.push(resultsTrial);

// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1>
    <p>You can close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .csv();
        console.log(data);
    }
};
timeline.push(debriefTrial);

jsPsych.run(timeline);