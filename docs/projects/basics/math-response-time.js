// Create an alert: "In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can."
alert('In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can. Welcome to our experiment!');

// Create three addition equations with whole numbers of your choosing between 1 and 10.
// Collect time before and after each trial.
// After each trial, the participant sees an alert saying "You answered [insert their answer here] in [response time] seconds."
let randomNumber1 = Math.floor(Math.random() * 10) + 1;
let randomNumber2 = Math.floor(Math.random() * 10) + 1;

let start1 = Date.now();
let response1 = prompt('What is ' + randomNumber1 + ' + ' + randomNumber2 + '?');
let end1 = Date.now();
let responseTime1 = (end1 - start1) / 1000;
alert('You answered ' + response1 + ' in ' + responseTime1 + ' seconds!');

randomNumber1 = Math.floor(Math.random() * 10) + 1;
randomNumber2 = Math.floor(Math.random() * 10) + 1;
let start2 = Date.now();
let response2 = prompt('What is ' + randomNumber1 + ' + ' + randomNumber2 + '?');
let end2 = Date.now();
let responseTime2 = (end2 - start2) / 1000;
alert('You answered ' + response2 + ' in ' + responseTime2 + ' seconds!');

randomNumber1 = Math.floor(Math.random() * 10) + 1;
randomNumber2 = Math.floor(Math.random() * 10) + 1;
let start3 = Date.now();
let response3 = prompt('What is ' + randomNumber1 + ' + ' + randomNumber2 + '?');
let end3 = Date.now();
let responseTime3 = (end3 - start3) / 1000;
alert('You answered ' + response3 + ' in ' + responseTime3 + ' seconds!');

// At the end, display an alert that says "Thank you for your participation!"
alert('Thank you for your participation!');

// // Week 3 Task Set

// let response = prompt('What is your name?');

// let count = response.length;
// console.log(count);

// let firstLetter = response.charAt(0);
// console.log(firstLetter);

// let lastLetter = response.charAt(count - 1);

// let age = 20;
// if (age = 25) {
//     console.log("Age is 25");
// }

// let a = 5;
// let b = 10;
// console.log(a > 3 && b < 15);

// let over18 = false;
// let hasGuardianApproval = true;
// console.log(over18 || hasGuardianApproval);

// let count = 8;
// console.log(count % 2 == 0);