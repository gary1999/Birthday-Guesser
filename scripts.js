let endDate;
let startDate;
let guessDate;
let totalGuesses;
let randomDate;
let state; //Before or After
let previousGuessList = [];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const generateRandomGuess = (startDate, endDate) => {
    randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    previousGuessList.push(randomDate);

    if (previousGuessList.length > 10){
        previousGuessList.shift();
    }

    displayGuesses(previousGuessList);
    return(randomDate);
} 

const initialDisplay = (initialGuess) => {


    console.log(startDate);

    let month = (monthNames[initialGuess.getMonth()]);
    let date = (initialGuess.getDate());
    let year = (initialGuess.getFullYear());
    let day = (dayNames[initialGuess.getDay()]);
    
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
}

const displayGuesses = (guessList) => {
    document.getElementById("previous-guess-list").innerHTML = "";
    guessList.reverse();

    initialDisplay(guessList[0]);

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

    if (state == 'before'){
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
    startDate = new Date(1998, 0, 1);
    endDate = new Date();
    guessDate = generateRandomGuess(startDate, endDate);
    totalGuesses = 0;
    updateGuesses();
    initialDisplay(randomDate);

}

initialise();

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("before-button").addEventListener('click', beforeGuess);
    document.getElementById("after-button").addEventListener('click', afterGuess);
    document.getElementById("reset-button").addEventListener('click', initialise);
    document.getElementById("undo-button").addEventListener('click', undo);
});