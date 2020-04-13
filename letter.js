class Letter {
    constructor(wordString) {
        this.wordString = wordString;
        this.equals = false;

    }
    showLetter() {
        if (this.equals) {
            return this.wordString;
        } else {
            return "_";
        }
    }
    guessLetter(playerGuess) {
        if (playerGuess === this.wordString) {
            return this.equals = true;
        }

    }
}

module.exports = Letter


// const a = new Letter("z");
// console.log(z.wordString, z.equals);
// z.guessLetter("b");
// z.showLetter(); 