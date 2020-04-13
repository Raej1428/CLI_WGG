const letter = require("./letter.js");

class Word {
    constructor (word) {
        this.wordArray = [];
        this.createWord(word);
    }

    createWord(word) {
        for (let i in word) {
            const char = word.charAt(i);
            const newLetter = new letter(char.toUpperCase());
            this.wordArray.push(newLetter);
        }
    }

    showWord() {
        let wordShow = [];
        for(let i in this.wordArray) {
            wordShow.push(this.wordArray[i].showLetter());
        }
        console.log(wordShow.join(" "));
    }

    guessWord(playerGuess) {
        for(let i in this.wordArray) {
            this.wordArray[i].guessLetter(playerGuess);
        }
    }
}

module.exports = Word;