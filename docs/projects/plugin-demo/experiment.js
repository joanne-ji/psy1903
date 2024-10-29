let jsPsych = initJsPsych();

let timeline = [];

let participantId = getCurrentTimestamp();

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
    <p style='font-size:30px'>Please draw the word shown on the next screen,
    and continue adding detail for 40 seconds.</p>
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

let words = ['apple', 'car', 'flower'];
let word = jsPsych.randomization.sampleWithoutReplacement(words, 1)[0];

let wordDisplay = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p style='font-size:30px'>${word}</p>
    `,
    trial_duration: 750,
    choices: [' '],
};
timeline.push(wordDisplay);

let encoding = {
    type: jsPsychSketchpad,
    prompt_location: 'belowcanvas',
    trial_duration: 40000,
    show_countdown_trial_duration: true,
};
timeline.push(encoding);

let recall = {
    type: jsPsychSurveyHtmlForm,
    preamble: `
    <p style='font-size:30px'>What was the word?</p>
    `,
    html: '<p><input type="text" id="test-resp-box" name="answer" size="20" /></p>',
    autofocus: 'test-resp-box'
};
timeline.push(recall);

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
    stimulus: function (data) {
        let linkToQualtricsSurvey = `https://harvard.az1.qualtrics.com/jfe/form/SV_3P0ZRwPCLKktZSm?experimentParticipantId=${participantId}`

        return `
        <h1>Thank you!</h1>
        <p>
            To complete your response, 
            please follow <a href='${linkToQualtricsSurvey}'>this link</a> 
            and complete the survey you see there.
        </p>
    `},
    choices: ['NO KEYS']
}
timeline.push(debriefTrial);

jsPsych.run(timeline);