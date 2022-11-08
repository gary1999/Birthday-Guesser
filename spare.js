document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById("month-before-button").addEventListener('click', test);
    // document.getElementById("day-before-button").addEventListener('click', test);
    // document.getElementById("year-before-button").addEventListener('click', test);
    // document.getElementById("month-after-button").addEventListener('click', test);
    // document.getElementById("day-after-button").addEventListener('click', test);
    // document.getElementById("year-after-button").addEventListener('click', test);
});


const initialDisplay = (initialGuess) => {


    // console.log(initialGuess);
    // console.log(initialGuess.getDate());
    // console.log(dayNames[initialGuess.getDay()]);
    // console.log(monthNames[initialGuess.getMonth()]);
    // console.log(initialGuess.getFullYear());

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
let previousGuessList = [];

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