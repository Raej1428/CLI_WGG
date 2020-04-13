const Word = require("./word.js");
const inquirer = require("inquirer");
const request = require('request');
const cheerio = require('cheerio');
const figlet = require('figlet');

class RandomWord {
    constructor() {
        this.word = "";
        this.getRandomWord();
    }

    getRandomWord() {
        const queryURL = "https://randomword.com/";
        request(queryURL, function (error, response, body) {
            if (error) {
                console.log("Error: ${error}");
            }

            if (response.statusCode === 200) {
                const $ = cheerio.load(body);
                this, word = $("random_word").text();
                word = new Word(this.word)
                randomWord = $("#randWord").text();
                defineIt = $("#randWordDef").text();
            }

        })
    }
}

let word = "";
let string = "";
let guesses = 0;

function setUp() {

    const randomWord = new RandomWord();

    string = "";
    guesses = 13;
    correctLetters = 0;
    lettersGuessed = [];

    inquirer.prompt([
        {
            type: "confirm",
            message: "I have a word in mind, can you guess the word one letter at a time?\n",
            name: "letsPlay"
        },
    ]).then(resume => {
        if (resume.letsPlay) {
            word.showWord();
            guessDaLetta();
        } else {
            console.log("Then this is... GOODBYE!");
        }

    });


}

const guessDaLetta = () => {
    const [...w] = word.wordArray;
    let letter = "";
    if (guesses > 0) {
        inquirer.prompt([
            {
                message: "What letter will you guess?\n",
                name: "letterGuess"
            }
        ]).then(resume => {
            letter = resume.letterGuess.toUpperCase();

            if (letter.length > 1 || letter.length < 1) {
                console.log("Guess one letter, please.");

            } else if (letter >= "a" && letter <= "z") {
                lettersGuessed.push(letter);
                word.guessWord(letter);
                string = "";

                for (i in w) {
                    if (w[i].equals) {
                        string += w[i].wordString;
                    }
                }
                console.log("\nLetters used: ${lettersUsed.join(' ')}\n");
                if (string.length === matchedLetters) {
                    guesses--;
                } else {
                    matchedLetters = string.length;
                }
            } else {
                console.log("Guess a letter, please!"); // error message if value other than a - z is selected
            }


            if (guesses === 0) {
                console.log(`You lose! The word was ${selectedWord}: ${defsetUpion}`);
                console.log(`\n*******************************************\n`)
                setUp();
                return;
            }


            if (string === selectedWord) {
                figlet('You Won!!!', function (err, data) {
                    if (err) {
                        console.log('Something went wrong...');
                        console.dir(err);
                        return;
                    }
                    console.log(data)
                });
                console.log(`You win! The word was ${selectedWord}: ${defsetUpion}`);
                console.log(`\n*******************************************\n`)
                setUp();
                return;
            } else {
                word.showWord();
                console.log(`\nYou have ${guesses} guess(es) left`);
                guessALetter();
            }
        });
    }
}

setUp();
