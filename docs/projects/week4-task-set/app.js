// // Question 3
// function celsiusToFahrenheit(celsius) {
//     let farenheit = (celsius * 1.8) + 32;
//     return farenheit;
// }

// console.log(celsiusToFahrenheit(10)); // Expected output: 50

// // Question 4
// function convertTemp(temp, convertTo) {
//     if (convertTo == 'c') {
//         let celsius = (temp - 32) / 1.8;
//         return celsius;
//     } else {
//         let fahrenheit = (temp * 1.8) + 32;
//         return fahrenheit;
//     }
// }

// console.log(convertTemp(10, 'c')); // Expected output: -12.222222222222221
// console.log(convertTemp(10, 'f')); // Expected output: 50

// // Question 5

// function getWordLengths(words) {
//     let wordLengths = [];
//     for (let word of words) {
//         wordLengths.push(word.length);
//     }
//     return wordLengths;
// }

// let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
// console.log(getWordLengths(words)); // Expected output: [5, 6, 6, 4, 5]

// Question 6

// function getLongestWord(words) {
//     let longestWord = '';
//     for (let word of words) {
//         if (word.length > longestWord.length) {
//             longestWord = word;
//         }
//     }
//     return longestWord;
// }

// let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
// console.log(getLongestWord(words)); // Expected output: banana

// Question 7

function getOddNumbers(numbers) {
    let results = [];
    for (let number of numbers) {
        if (number % 2 !== 0) {
            results.push(number);
        }
    }
    return results;
}

console.log(getOddNumbers([1, 2, 3, 4, 5])); // Expected output: [1, 3, 5]
console.log(getOddNumbers([12, 45, 10, 11, 61])); // Expected output: [45, 11, 61]

// // Question 8

// function filterNumbers(numbers, evenOdd) {
//     let results = [];
//     for (let number of numbers) {
//         if (evenOdd == 'even') {
//             if (number % 2 == 0) {
//                 results.push(number);
//             }
//         } else {
//             if (number % 2 !== 0) {
//                 results.push(number);
//             }
//         }
//     }
//     return results;
// }

// console.log(filterNumbers([1, 2, 3, 4, 5], 'even')); // Expected output: [2, 4]
// console.log(filterNumbers([1, 2, 3, 4, 5], 'odd')); // Expected output: [1, 3, 5]

// console.log(filterNumbers([45, 10, 11, 61], 'even')); // Expected output: [10]
// console.log(filterNumbers([45, 10, 11, 61], 'odd')); // Expected output: [45, 11, 61]