// Create an alert: "In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can."
alert('In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can. Welcome to our experiment!');

// Create three addition equations with whole numbers of your choosing between 1 and 10.
// Collect time before and after each trial.
// After each trial, the participant sees an alert saying "You answered [insert their answer here] in [response time] seconds."
let randomNumber1 = Math.floor(Math.random() * 10) + 1;
let randomNumber2 = Math.floor(Math.random() * 10) + 1;

let start1 = Date.now();
let response1 = prompt('What is ' + randomNumber1 + ' + ' + randomNumber2 + '?');
let correctAnswer1 = randomNumber1 + randomNumber2
let end1 = Date.now();
let responseTime1 = (end1 - start1) / 1000;
if (response1 == correctAnswer1) {
    alert('You answered ' + response1 + ' (correct)' + ' in ' + responseTime1 + ' seconds!');
} else {
    alert('You answered ' + response1 + ' (incorrect)' + ' in ' + responseTime1 + ' seconds!');
}

randomNumber1 = Math.floor(Math.random() * 10) + 1;
randomNumber2 = Math.floor(Math.random() * 10) + 1;
let start2 = Date.now();
let response2 = prompt('What is ' + randomNumber1 + ' + ' + randomNumber2 + '?');
let correctAnswer2 = randomNumber1 + randomNumber2
let end2 = Date.now();
let responseTime2 = (end2 - start2) / 1000;
if (response2 == correctAnswer2) {
    alert('You answered ' + response2 + ' (correct)' + ' in ' + responseTime2 + ' seconds!');
} else {
    alert('You answered ' + response2 + ' (incorrect)' + ' in ' + responseTime2 + ' seconds!');
}

randomNumber1 = Math.floor(Math.random() * 10) + 1;
randomNumber2 = Math.floor(Math.random() * 10) + 1;
let start3 = Date.now();
let response3 = prompt('What is ' + randomNumber1 + ' + ' + randomNumber2 + '?');
let correctAnswer3 = randomNumber1 + randomNumber2
let end3 = Date.now();
let responseTime3 = (end3 - start3) / 1000;
if (response3 == correctAnswer3) {
    alert('You answered ' + response3 + ' (correct)' + ' in ' + responseTime3 + ' seconds!');
} else {
    alert('You answered ' + response3 + ' (incorrect)' + ' in ' + responseTime3 + ' seconds!');
}

// At the end, display an alert that says "Thank you for your participation!"
alert('Thank you for your participation!');