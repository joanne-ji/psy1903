// Misc Practice Part A

let randomNumber1 = Math.floor(Math.random() * 10) + 1;
let randomNumber2 = Math.floor(Math.random() * 10) + 1;

let response = prompt('What is ' + randomNumber1 + '+' + randomNumber2 + '?');

let correctAnswer = randomNumber1 + randomNumber2;

let feedback = '';

if (response == randomNumber1 + randomNumber2) {
    feedback = 'Correct!';
} else if (response == correctAnswer - 1 || response == correctAnswer + 1) {
    feedback = 'You were close!';
} else {
    feedback = 'Incorrect.';
}

alert(feedback + ' The expected answer is ' + correctAnswer + '.');

// Misc Practice Part B

let age = prompt('How old are you?');
if (age < 12) {
    alert('Child');
}
if (age >= 12 && age <= 17) {
    alert('Teenager');
}
if (age >= 18) {
    alert('Adult');
}