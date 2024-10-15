let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='name'>Welcome to the experiment!</h1> 
    <p>In this experiment, you will complete the following three tasks:.</p>
    <p>In Task 1, you will watch a short video.</p>
    <p>In Task 2, you will categorize a series of words.</p>
    <p>In Task 3, you will answer a brief set of questions.</p>
    <p>Press the <span class='key'>SPACE</span> key to begin Task 1.</p>
    `,
    choices: [' '],
};