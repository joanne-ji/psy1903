let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='name'>Welcome to the Math Response Time Task!</h1> 
    <p>In this experiment, you will be shown a series of math expressions.</p>
    <p>Please answer as quickly and as accurately as possible.</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

// Conditions
for (let block of conditions) {
    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1>${block.title}</h1>
        <p>Press SPACE to begin.</p>
        `,
        choices: [' '],
    }
    timeline.push(blockIntroTrial);

    for (let conditionTrial of block.questions) {
        let trial = {
            type: jsPsychSurveyHtmlForm,
            preamble: `
            <p class='equation'>What is <span class='number'>${conditionTrial.num1}</span> + <span class='number'>${conditionTrial.num2}</span>?</p>
            `,
            html: `
            <p><input type='text' name='answer' id='answer'></p>
            `,
            autofocus: 'answer',
            button_label: 'Submit',
            data: {
                collect: true,
                num1: conditionTrial.num1,
                num2: conditionTrial.num2,
                block: block.title
            },
            on_finish: function (data) {
                data.answer = data.response.answer;
                if (data.answer == conditionTrial.answer) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        };
        timeline.push(trial);
    }
}

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
            .filter({ collect: true })
            .ignore(['collect', 'stimulus', 'trial_type', 'trial_index', 'plugin_version'])
            .csv();
        console.log(data);
    }
};

timeline.push(debriefTrial);

jsPsych.run(timeline);