// Initialize an empty array you will populate with your conditions
let conditions = [];

for (let i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);
    conditions.push({
        num1: num1,
        num2: num2,
        answer: num1 + num2
    });
}

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

// Output the resulting conditions array to make sure it is set up correctly
console.log(conditions);