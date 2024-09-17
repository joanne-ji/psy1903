console.log(5 == 5 && 10 > 1) // true
console.log('red' == 'blue' || 1 < 10) // true
console.log(20 > 15 < 15) // true; you would think that it's false but JS reads from left to right and "true" = 1
console.log(12 % 2 == 0) // true
console.log('red' != 'green' || 'orange' == 'purple') // true
console.log((10 >= 10) && (false == false) && (20 !== 19)) // true
console.log(true && true || false) // true

let response = prompt('What is 4+6?');

let feedback = '';

if (response == 10) {
    feedback = 'You got it correct!';
} else if (response == 9 || response == 11) {
    feedback = 'You got it close!';
} else {
    feedback = 'You got it incorrect.';
}

alert(feedback + ' The expected answer is 10!');