// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');

let num1Output = document.getElementById('num1');
let num2Output = document.getElementById('num2');

let num1 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
let num2 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

let correctAnswer = num1 + num2;

num1Output.innerHTML = num1;
num2Output.innerHTML = num2;

let start = Date.now();

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    // Stop the timer!
    let end = Date.now();

    // Calculate response time
    let responseTime = (end - start) / 1000;

    // Collect the response
    let response = form.elements['response'].value;

    // Report the results
    if (response == correctAnswer) {
        results.innerHTML = 'You answered ' + response + ' (correct)' + ' in ' + responseTime + ' seconds!';
    } else {
        results.innerHTML = 'You answered ' + response + ' (incorrect)' + ' in ' + responseTime + ' seconds!';
    }

    // Hide the form (including instructions)
    form.style.display = 'none';
});