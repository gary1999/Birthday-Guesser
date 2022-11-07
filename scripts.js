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

let totalGuesses;
let previousGuessList = [];

let currentGuess;
let currentMonth;
let currentDate;
let currentYear;


const test = (e) => {
    switch (e.target.id) {
        case 'month-before-button':
            console.log(currentMonth);
            break;
        case 'day-before-button':
            console.log(currentDate);
            break;
        case 'year-before-button':
            console.log(currentYear);
            break;
        case 'month-after-button':
            console.log(currentMonth);
            break;
        case 'day-after-button':
            console.log(currentDate);
            break;
        case 'year-after-button':
            console.log(currentYear);
            break;
        default:
            console.log('default');
    }
    console.log(currentGuess);
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


const initialDisplay = (initialGuess) => {

    currentMonth = monthNames[initialGuess.getMonth()];
    currentDate = initialGuess.getDate();
    currentYear = initialGuess.getFullYear();

    document.getElementById("month-guess").innerHTML = currentMonth;
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

const updateGuesses = () => {
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
    updateGuesses();
    initialDisplay(initialGuess);

}

initialise();

// console.log(`the initial guess is ${initialGuess}`);

