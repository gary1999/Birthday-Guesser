let endDate;
let startDate;
let guessDate;
let totalGuesses;
let displayGuess;
let previousGuessList = [];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const randomDate = (startDate, endDate) => {
    displayGuess = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    
    let month = (monthNames[displayGuess.getMonth()]);
    let date = (displayGuess.getDate());
    let year = (displayGuess.getFullYear());
    let day = (dayNames[displayGuess.getDay()]);
    
    let exist = document.getElementById('birthdayDisplayID');
    if (exist === null){
        const birthdayDisplay = document.createElement('div');
        birthdayDisplay.classList = 'birthdayDisplay';
        birthdayDisplay.id = 'birthdayDisplayID';
        birthdayDisplay.innerHTML = (`${month} ${date} ${year} (${day})`);
        document.getElementById("birthdayGuess").appendChild(birthdayDisplay);
    } else {
        document.getElementById('birthdayDisplayID').innerHTML = (`${month} ${date} ${year} (${day})`);
        
    }
    
    if (previousGuessList.length > 9){
        previousGuessList.shift();
    }

    previousGuessList.push(displayGuess);

    displayGuesses(previousGuessList);
    return(displayGuess);
} 

const displayGuesses = (guessList) => {
    document.getElementById("previous-guess-list").innerHTML = "";

    guessList.reverse();

    for (let i=1; i<guessList.length; i++){

        let dateInList = guessList[i];
        let month = (monthNames[dateInList.getMonth()]);
        let date = (dateInList.getDate());
        let year = (dateInList.getFullYear());
        let day = (dayNames[dateInList.getDay()]);

        const guessDisplayDiv = document.createElement('div');
        guessDisplayDiv.id = `previousGuess${i+1}`;
        guessDisplayDiv.innerHTML = (`${month} ${date} ${year} (${day})`);
        guessDisplayDiv.style.opacity = `0.${10-i-1}`
        document.getElementById("previous-guess-list").appendChild(guessDisplayDiv);
    }

    guessList.reverse();

}

const beforeGuess = () => {
    console.log("Before");
    // console.log(guessDate);
    endDate = guessDate;
    guessDate = randomDate(startDate, endDate);
    updateGuesses();
    console.log(guessDate);
}

const afterGuess = () => {
    console.log("After");
    startDate = guessDate;
    guessDate = randomDate(startDate, endDate);
    updateGuesses();
    console.log(guessDate);
}

const undo = () => {
    previousGuessList.reverse();
    console.log(previousGuessList);
    
    let previousDate = previousGuessList[1];
    let month = (monthNames[previousDate.getMonth()]);
    let date = (previousDate.getDate());
    let year = (previousDate.getFullYear());
    let day = (dayNames[previousDate.getDay()]);

    previousGuessList.shift(1);
    previousGuessList.reverse();
    displayGuesses(previousGuessList);


    previousGuessDisplayReplace = document.getElementById('birthdayDisplayID');
    previousGuessDisplayReplace.innerHTML = (`${month} ${date} ${year} (${day})`);

    console.log(`${month} ${date} ${year} (${day})`)
}

const updateGuesses = () => {
    totalGuesses += 1;
    const counterDisplay = document.getElementById("counter");
    counterDisplay.innerHTML = totalGuesses;

}

const initialise = () => {
    startDate = new Date(1998, 0, 1);
    endDate = new Date();
    guessDate = randomDate(startDate, endDate);
    console.log(guessDate);
    totalGuesses = 0;
    updateGuesses();

}

initialise();

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("before-button").addEventListener('click', beforeGuess);
    document.getElementById("after-button").addEventListener('click', afterGuess);
    document.getElementById("reset-button").addEventListener('click', initialise);
    document.getElementById("undo-button").addEventListener('click', undo);
    
});