document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById("before-button").addEventListener('click', beforeGuess);
    // document.getElementById("after-button").addEventListener('click', afterGuess);
    document.getElementById("reset-button").addEventListener('click', initialise);
    document.getElementById("undo-button").addEventListener('click', undo);
});

document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById("month-before-button").addEventListener('click', test);
    // document.getElementById("day-before-button").addEventListener('click', test);
    // document.getElementById("year-before-button").addEventListener('click', test);
    // document.getElementById("month-after-button").addEventListener('click', test);
    // document.getElementById("day-after-button").addEventListener('click', test);
    // document.getElementById("year-after-button").addEventListener('click', test);
    elements = document.getElementsByClassName("guess-button");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', test);
    }
});


const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const days31 = [0, 2, 4, 6, 7, 9, 11];
const days30 = [3, 5, 8, 10];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

let totalGuesses;
let previousGuessList = [];

let currentGuess;
let currentMonth;
let currentDate;
let currentYear;


const test = (e) => {
    console.log(currentGuess);

    switch (e.target.id) {
        case 'month-before-button':
            newMonthGuess = getRandomInt(0, currentMonth);
            currentGuess.setMonth(newMonthGuess);
            display(currentGuess);
            break;

        case 'day-before-button':
            // console.log(`before: ${currentDate}`)
            newDayGuess = getRandomInt(1, currentDate);
            currentGuess.setDate(newDayGuess);
            // console.log(`after: ${newDayGuess}`)
            display(currentGuess);
            break;

        case 'year-before-button':
            console.log(currentYear);
            break;

        case 'month-after-button':
            //Add one to current value because it can roll the same number if not
            newMonthGuess = getRandomInt(currentMonth + 1, 11);
            currentGuess.setMonth(newMonthGuess);
            display(currentGuess);
            break;

        case 'day-after-button':
            //Add one to current value because it can roll the same number if not

            if (days31.includes(currentMonth)) {
                newDayGuess = getRandomInt(currentDate + 1, 31);
            }
            else {
                newDayGuess = getRandomInt(currentDate + 1, 30);
            }

            currentGuess.setDate(newDayGuess);
            display(currentGuess);
            break;

        case 'year-after-button':
            console.log(currentYear);
            break;

        default:
            console.log('default');
    }

}


const generateRandomGuess = (startDate, endDate) => {
    randomDate = (
        new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
    );
    // previousGuessList.push(randomDate);

    // console.log(previousGuessList);

    // if (previousGuessList.length > 10) {
    //     previousGuessList.shift();
    // }

    // displayGuesses(previousGuessList);
    return (randomDate);
}

const dateToString = (guess) => {
    let month = (monthNames[guess.getMonth()]);
    let date = (guess.getDate());
    let year = (guess.getFullYear());
    let day = (dayNames[guess.getDay()]);
    return (`${month} ${date} ${year} (${day})`);
}


const display = (guess) => {

    currentMonth = guess.getMonth();
    currentDate = guess.getDate();
    currentYear = guess.getFullYear();

    document.getElementById("month-guess").innerHTML = monthNames[currentMonth];
    document.getElementById("date-guess").innerHTML = currentDate;
    document.getElementById("year-guess").innerHTML = currentYear;

}


const displayGuesses = (guessList) => {
    // document.getElementById("previous-guess-list").innerHTML = "";
    // guessList.reverse();

    // initialDisplay(guessList[0]);

    // for (let i = 1; i < guessList.length; i++) {
    //     let dateInList = guessList[i];
    //     let guessString = dateToString(dateInList);
    //     const guessDisplayDiv = document.createElement('div');
    //     guessDisplayDiv.id = `previousGuess${i + 1}`;
    //     guessDisplayDiv.innerHTML = guessString;
    //     guessDisplayDiv.style.opacity = `0.${10 - i - 1}`
    //     document.getElementById("previous-guess-list").appendChild(guessDisplayDiv);
    // }
    // guessList.reverse();
    // updateGuesses();
}

const beforeGuess = () => {
    endDate = guessDate;
    state = 'before';
    guessDate = generateRandomGuess(startDate, endDate);
}

const afterGuess = () => {
    startDate = guessDate;
    state = 'after';
    guessDate = generateRandomGuess(startDate, endDate);
}

const undo = () => {
    previousGuessList.reverse();

    let previousDate = previousGuessList[1];
    previousGuessList.splice(0, 1);

    if (state == 'before') {
        startDate = previousDate;
    } else {
        endDate = previousDate;
    }
    console.log(previousGuessList);
    previousGuessList.reverse();
    displayGuesses(previousGuessList);
}

const updateGuessCounter = () => {
    totalGuesses += 1;
    const counterDisplay = document.getElementById("counter");
    counterDisplay.innerHTML = totalGuesses;
}

const initialise = () => {
    startDate = new Date(1920, 0, 1);
    endDate = new Date();
    initialGuess = generateRandomGuess(startDate, endDate);
    currentGuess = initialGuess;
    totalGuesses = 0;
    updateGuessCounter();
    display(initialGuess);

}

initialise();

// console.log(`the initial guess is ${initialGuess}`);

