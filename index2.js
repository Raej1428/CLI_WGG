const Word = require("./word.js");
const inquirer = require("inquirer");
const request = require('request');
const cheerio = require('cheerio');
const figlet = require('figlet');
const randomWords = require('random-words');


var lettersOfWord = [];
var guessesLeft = 13;

var newRanWord = function () {
    randWord = randomWords.wordList[Math.floor(Math.random() * randomWords.wordList.length)];
    // console.log(randWord); // Testing
    const newWord = new Word(randWord);
    newWord.showWord();

}

newRanWord();

