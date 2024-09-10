let welcomeMessage = `
Welcome to our experiment!
Please read the instructions carefully.
`;

let experimentName = 'Stroop';
console.log(typeof experiment); // string\
console.log(experiment.charAt(1)); // 't'

let trialCount = 20;
console.log(typeof trialCountMax); // number

// TODO: Randomize colors
let colors = ['red', 'green', 'blue'];

alert('Welcome to the ' + experimentName + ' experiment!');

// trialCount = 40;

// At the halfway point, we will display a pause screen
let halfwayCount = trialCount / 2; // Expected: 20

/*
This can be a multi-line comment
if need be
like this!
 */

// Example of a boolean data type
let correct = false;
console.log(typeof correct);

console.log(10 < 15); // false

// Try using the prompt method to fetch responses
let response = prompt('What is 5+3?');
console.log(response);

response = prompt('What is 5+5?'); // notice that we don't use let when we change the variable
console.log(response);