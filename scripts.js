let endDate;
let startDate;
let guessDate;
let totalGuesses;
let randomDate;
let state; //Before or After
let previousGuessList = [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("before-button").addEventListener('click', beforeGuess);
    document.getElementById("after-button").addEventListener('click', afterGuess);
    document.getElementById("reset-button").addEventListener('click', initialise);
    document.getElementById("undo-button").addEventListener('click', undo);
});

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


const generateRandomGuess = (startDate, endDate) => {
    randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    previousGuessList.push(randomDate);

    console.log(previousGuessList);

    if (previousGuessList.length > 10) {
        previousGuessList.shift();
    }

    displayGuesses(previousGuessList);
    return (randomDate);
}

const guessDateToString = (guess) => {
    let month = (monthNames[guess.getMonth()]);
    let date = (guess.getDate());
    let year = (guess.getFullYear());
    let day = (dayNames[guess.getDay()]);
    return (`${month} ${date} ${year} (${day})`);
}

const initialDisplay = (initialGuess) => {


    console.log(startDate);

    let guessString = guessDateToString(initialGuess);

    let exist = document.getElementById('birthdayDisplayID');
    if (exist === null) {
        const birthdayDisplay = document.createElement('div');
        birthdayDisplay.classList = 'birthdayDisplay';
        birthdayDisplay.id = 'birthdayDisplayID';
        birthdayDisplay.innerHTML = guessString;
        document.getElementById("birthdayGuess").appendChild(birthdayDisplay);
    } else {
        document.getElementById('birthdayDisplayID').innerHTML = guessString;
    }
}

const displayGuesses = (guessList) => {
    document.getElementById("previous-guess-list").innerHTML = "";
    guessList.reverse();

    initialDisplay(guessList[0]);

    for (let i = 1; i < guessList.length; i++) {
        let dateInList = guessList[i];
        let guessString = guessDateToString(dateInList);
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
    startDate = new Date(1998, 0, 1);
    endDate = new Date();
    guessDate = generateRandomGuess(startDate, endDate);
    totalGuesses = 0;
    updateGuesses();
    initialDisplay(randomDate);

}

initialise();

