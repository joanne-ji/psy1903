// // Question 3
// function celsiusToFahrenheit(celsius) {
//     let farenheit = (celsius * 1.8) + 32;
//     return farenheit;
// }

// console.log(celsiusToFahrenheit(10)); // Expected output: 50

// Question 4
function convertTemp(temp, convertTo) {
    if (convertTo == 'c') {
        let celsius = (temp - 32) / 1.8;
        return celsius;
    } else {
        let fahrenheit = (temp * 1.8) + 32;
        return fahrenheit;
    }
}

console.log(convertTemp(10, 'c')); // Expected output: -12.222222222222221
console.log(convertTemp(10, 'f')); // Expected output: 50