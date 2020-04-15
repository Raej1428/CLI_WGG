const Word = require("./word.js");
const inquirer = require('inquirer');
const colors = require('colors');
const figlet = require('figlet');
const randomWords = require('random-words');

var wordList = randomWords.wordList;
var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

//Chooses a word from the word array, uses the word constructor to create the proper display and functionality;
//'chosenWord' is used for comparison later to check if the word is solved
function startGame() {
    if (wordList.length < 2) {
        wordList = randomWords.wordList;
    }
    select = Math.floor(Math.random() * wordList.length);
    chosenWord = wordList[select];
    gameWord = new Word(chosenWord);
    gameWord.makeWord();
    if (select > -1) {
        wordList.splice(select, 1);
    }
    console.log("\nYou get 13 letter guesses to find the correct word.\n".rainbow)
    promptUser();
}

//Allows the user to input a letter guess, restarts the game if player is out of wrong guesses.
function promptUser() {
    if (counter < 13) {
        console.log(gameWord.showWord());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "\nPick a letter and press enter. ".cyan
            }
        ]).then(function (data) {
            checkAnswer(data);
        });
    }
    else {
        console.log("\nSorry, you're out of guesses.\n".inverse);
        console.log("The word was: " + chosenWord.rainbow);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
}

//checks that the user's input is in correct format and compares the letter to gameWord to see if guess is correct
function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-z, A-Z]+$/.test(data.letter)) {
        var checkLetter = data.letter;
        var temp = gameWord.showWord();
        gameWord.checkGuess(checkLetter);
        if (temp === gameWord.showWord()) {
            console.log("\nSorry, wrong letter!\n".yellow);
            counter++;
            console.log(((13 - counter) + " guesses remaining").yellow);
            promptUser();
        }
        else {
            rightGuess();
        }
    }
    else {
        console.log("\nPlease enter a letter, one at a time.\n".yellow);
        promptUser();
    }
}

//If the user's guess is correct, the word array displays the word with the guessed letter(s), 
//If the entire word is correct (filled in), the game restarts.
function rightGuess() {
    console.log("\nYou guessed correctly.\n".green);
    if (chosenWord.replace(/ /g, "") == (gameWord.showWord()).replace(/ /g, "")) {
        console.log(gameWord.showWord().america);
        console.log('\nYou win!!\n'.america);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
    else {
        promptUser();
    }
}

startGame();