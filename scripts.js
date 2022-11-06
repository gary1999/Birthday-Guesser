let endDate;
let startDate;
let guessDate;
let totalGuesses;
let randomDate;
let state; //Before or After
let previousGuessList = [];

document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById("before-button").addEventListener('click', beforeGuess);
    // document.getElementById("after-button").addEventListener('click', afterGuess);
    document.getElementById("reset-button").addEventListener('click', initialise);
    document.getElementById("undo-button").addEventListener('click', undo);
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("month-before-button").addEventListener('click', initialise);
    document.getElementById("day-before-button").addEventListener('click', undo);
    document.getElementById("year-before-button").addEventListener('click', undo);
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("month-after-button").addEventListener('click', initialise);
    document.getElementById("day-after-button").addEventListener('click', undo);
    document.getElementById("year-after-button").addEventListener('click', undo);
});

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];



const generateRandomGuess = (startDate, endDate) => {
    randomDate = (
        new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
    );
    previousGuessList.push(randomDate);

    console.log(previousGuessList);

    if (previousGuessList.length > 10) {
        previousGuessList.shift();
    }

    displayGuesses(previousGuessList);
    return (randomDate);
}

const dateToString = (guess) => {
    let month = (monthNames[guess.getMonth()]);
    let date = (guess.getDate());
    let year = (guess.getFullYear());
    let day = (dayNames[guess.getDay()]);
    return (`${month} ${date} ${year} (${day})`);
}

const before = (buttonName) => {

    switch (buttonName) {
        case 'month-before-button':
            break;
        case 'day-before-button':
            break;
        case 'year-before-button':
            break;
        default:
            console.log('default');
    }

}


const initialDisplay = (initialGuess) => {

    // console.log(initialGuess);
    // console.log(initialGuess.getDate());
    // console.log(dayNames[initialGuess.getDay()]);
    // console.log(monthNames[initialGuess.getMonth()]);
    // console.log(initialGuess.getFullYear());

    document.getElementById("month-guess").innerHTML = (monthNames[initialGuess.getMonth()]);
    document.getElementById("date-guess").innerHTML = (initialGuess.getDate());
    document.getElementById("year-guess").innerHTML = (initialGuess.getFullYear());

    // let exist = document.getElementById('birthdayDisplayID');
    // if (exist === null) {
    //     const birthdayDisplay = document.createElement('div');
    //     birthdayDisplay.classList = 'birthdayDisplay';
    //     birthdayDisplay.id = 'birthdayDisplayID';
    //     birthdayDisplay.innerHTML = guessString;
    //     document.getElementById("birthdayGuess").appendChild(birthdayDisplay);
    // } else {
    //     document.getElementById('birthdayDisplayID').innerHTML = guessString;
    // }
}

const displayGuesses = (guessList) => {
    document.getElementById("previous-guess-list").innerHTML = "";
    guessList.reverse();

    initialDisplay(guessList[0]);

    for (let i = 1; i < guessList.length; i++) {
        let dateInList = guessList[i];
        let guessString = dateToString(dateInList);
        const guessDisplayDiv = document.createElement('div');
        guessDisplayDiv.id = `previousGuess${i + 1}`;
        guessDisplayDiv.innerHTML = guessString;
        guessDisplayDiv.style.opacity = `0.${10 - i - 1}`
        document.getElementById("previous-guess-list").appendChild(guessDisplayDiv);
    }
    guessList.reverse();
    updateGuesses();
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

const resetGuesses = () => {

}

const initialise = () => {
    startDate = new Date(1920, 0, 1);
    endDate = new Date();
    initialGuess = generateRandomGuess(startDate, endDate);
    totalGuesses = 0;
    updateGuesses();
    initialDisplay(initialGuess);

}

initialise();

