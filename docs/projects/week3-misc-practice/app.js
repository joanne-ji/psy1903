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