// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');
let equation = document.getElementById('equation');

let num1Output = document.getElementById('num1');
let num2Output = document.getElementById('num2');

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

equation.innerHTML = 'What is ' + num1 + ' + ' + num2 + '?';

num1Output.innerHTML = num1;
num10inout.innerHTML = nm2;


// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    // Stop the timer!

    // Collect the name
    let response = form.elements['name'].value;

    let resultsMessage = '';

    if (over18) {
        resultsMessage = 'Hello ' + response + '!';
    } else {
        resultsMessage = 'This experiment is only for those older than 18.';
    }

    // Report the results
    results.innerHTML = resultsMessage;

    // Hide the form, including the instructions
    form.style.display = 'none';

});