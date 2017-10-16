var easyWords = ["cat", "dog", "hello", "less", "more", "red", "green", "happy", "cow", "day"];
var mediumWords = ["forested", "lonely", "misty", "explain", "code", "realize", "hopeful", "creative", "dream",
    "lizard", "panda", "goat", "paste", "thought", "idea", "medium", "hangman", "delete", "guess",
    "test", "school", "seagull", "octopus", "print", "light", "trite", "ending", "trash", "ague"];
var difficultWords = ["procrastination", "xylophone", "awkward", "bagpipes", "banjo", "bungler", "croquet",
    "crypt", "dwarves", "fervid", "fishhook", "fjord", "gazebo", "haphazard", "ivory", "jukebox", "kayak",
    "kiosk", "klutz", "memento", "mystify", "ostracize", "oxygen", "pajama", "phlegm", "pixel", "polka",
    "quip", "rhythmic", "rogue", "sphinx", "squawk", "swivel", "twelfth", "waxy", "wildebeest", "yacht",
    "zealous", "zigzag", "zippy", "zombie", "difficultdifficultlemondifficult", "reiteration"];
var obscureWords = ["absquatulate", "cryptozoology", "defervescence", "deipnosophist", "disembogue",
    "floccinaucinihilipilification", "galligaskins", "gnathic", "haruspex", "illywhacker", "logomachy",
    "cnidaria"];
var guessedLetters = [""];
var word = "";
var assembledWord = "";
var guessesLeft = 7;
var isPlaying= false;

function newGame() {
    isPlaying = false;
    guessedLetters = [""];
    word = "";
    assembledWord = "";
    guessesLeft = 7;
    document.getElementById("guessALetter").innerHTML = "";
    document.getElementById("wordSoFar").innerHTML = "";
    document.getElementById("finishMessage").innerHTML = "";
    document.getElementById("newGame").innerHTML = "";
    document.getElementById("submitLetter").innerHTML = "";
    document.getElementById("listOfGuessedLetters").innerHTML = "";
    document.getElementById("guessesRemaining").innerHTML = "";
    document.getElementById("hangmanImage").innerHTML = "";

}

function startGame() {
    if(!isPlaying){
        var difficulty = document.getElementById("pickDifficulty").value;
        word = getWord(difficulty);
        console.log("word=" + word);
        for(var i = 0; i < word.length; i++){
            assembledWord += ".";
        }
        console.log("assembledWord=" + assembledWord);
        document.getElementById("guessALetter").innerHTML = "   <label for=\"pickLetter\" id=\"whatLetter\" class=\"selectLabel\">Guess a letter:</label>\n" +
            "    <select id=\"pickLetter\">\n" +
            "        <option class=\"letter\" value=\"a\">a</option>\n" +
            "        <option class=\"letter\" value=\"b\">b</option>\n" +
            "        <option class=\"letter\" value=\"c\">c</option>\n" +
            "        <option class=\"letter\" value=\"d\">d</option>\n" +
            "        <option class=\"letter\" value=\"e\">e</option>\n" +
            "        <option class=\"letter\" value=\"f\">f</option>\n" +
            "        <option class=\"letter\" value=\"g\">g</option>\n" +
            "        <option class=\"letter\" value=\"h\">h</option>\n" +
            "        <option class=\"letter\" value=\"i\">i</option>\n" +
            "        <option class=\"letter\" value=\"j\">j</option>\n" +
            "        <option class=\"letter\" value=\"k\">k</option>\n" +
            "        <option class=\"letter\" value=\"l\">l</option>\n" +
            "        <option class=\"letter\" value=\"m\">m</option>\n" +
            "        <option class=\"letter\" value=\"n\">n</option>\n" +
            "        <option class=\"letter\" value=\"o\">o</option>\n" +
            "        <option class=\"letter\" value=\"p\">p</option>\n" +
            "        <option class=\"letter\" value=\"q\">q</option>\n" +
            "        <option class=\"letter\" value=\"r\">r</option>\n" +
            "        <option class=\"letter\" value=\"s\">s</option>\n" +
            "        <option class=\"letter\" value=\"t\">t</option>\n" +
            "        <option class=\"letter\" value=\"u\">u</option>\n" +
            "        <option class=\"letter\" value=\"v\">v</option>\n" +
            "        <option class=\"letter\" value=\"w\">w</option>\n" +
            "        <option class=\"letter\" value=\"x\">x</option>\n" +
            "        <option class=\"letter\" value=\"y\">y</option>\n" +
            "        <option class=\"letter\" value=\"z\">z</option>\n" +
            "\n" +
            "    </select>";
        document.getElementById("submitLetter").innerHTML = "   <button id=\"guessLetter\" class=\"submitInfo\" onclick=\"onGuess()\" style=\"width:100px\" >Guess!</button>";
        document.getElementById("wordSoFar").innerHTML = assembledWord;
        isPlaying = true;
    }
}

function onGuess() {
    var builtWord = "";
    var youLost = "GAME OVER: YOU LOSE. The word was " + word;
    var youWon = "congratulations- you win!";
    if(guessesLeft > 0) {
        var letterGuessed = document.getElementById("pickLetter").value;
        var letterPresent = guessLetter(letterGuessed);
        if(letterPresent !== -1){
            builtWord = printWord(letterGuessed);
        }else{
            builtWord = "already been guessed";
        }
        if(guessesLeft === 7){
            document.getElementById("hangmanImage").innerHTML = "    <img src=\"https://78.media.tumblr.com/770fe5ca14e51d981871c0ca8b4394ad/tumblr_oxru9g0dvD1vnkjhvo1_1280.png  \" alt=\"image not available\" style=\"width:100px\">\n";
        }
        if(guessesLeft === 6){
            document.getElementById("hangmanImage").innerHTML = "    <img src=\"https://78.media.tumblr.com/80fd0bd4f206b88d492dcd4c52033541/tumblr_oxru9g0dvD1vnkjhvo2_1280.png  \" alt=\"image not available\" style=\"width:100px\">\n";
        }
        if(guessesLeft === 5){
            document.getElementById("hangmanImage").innerHTML = "    <img src=\"https://78.media.tumblr.com/6bcd46495d82a32e6667561b2f10bb12/tumblr_oxru9g0dvD1vnkjhvo3_1280.png  \" alt=\"image not available\" style=\"width:100px\">\n";
        }
        if(guessesLeft === 4){
            document.getElementById("hangmanImage").innerHTML = "    <img src=\"https://78.media.tumblr.com/a6eb6a1916b2be28aad96e6e083460c3/tumblr_oxru9g0dvD1vnkjhvo4_1280.png  \" alt=\"image not available\" style=\"width:100px\">\n";
        }
        if(guessesLeft === 3){
            document.getElementById("hangmanImage").innerHTML = "    <img src=\"https://78.media.tumblr.com/c9b4ec865e73d765e62ec00ed4e3b274/tumblr_oxru9g0dvD1vnkjhvo5_1280.png  \" alt=\"image not available\" style=\"width:100px\">\n";
        }
        if(guessesLeft === 2){
            document.getElementById("hangmanImage").innerHTML = "    <img src=\"https://78.media.tumblr.com/6044e1af430714a7ffb5ed6c9e9fbe03/tumblr_oxru9g0dvD1vnkjhvo6_1280.png  \" alt=\"image not available\" style=\"width:100px\">\n";
        }
        if(guessesLeft === 1){
            document.getElementById("hangmanImage").innerHTML = "    <img src=\"https://78.media.tumblr.com/c45815784496dcbaeb2bcddecab0b843/tumblr_oxru9g0dvD1vnkjhvo7_1280.png  \" alt=\"image not available\" style=\"width:100px\">\n";
        }
        if(guessesLeft === 0){
            document.getElementById("hangmanImage").innerHTML = "    <img src=\"https://78.media.tumblr.com/7385033878ef1cb6866a400c5e84cce7/tumblr_oxru9g0dvD1vnkjhvo8_1280.png  \" alt=\"image not available\" style=\"width:100px\">\n";
        }
        document.getElementById("wordSoFar").innerHTML = builtWord;
        var listOfLetters = "Letters guessed: " + guessedLetters.toString();
        listOfLetters = listOfLetters.substring(0, 17) + listOfLetters.substring(18, listOfLetters.length);
        document.getElementById("listOfGuessedLetters").innerHTML = listOfLetters;
        var howManyGuesses = "Guesses left: " + (guessesLeft + 1);
        document.getElementById("guessesRemaining").innerHTML = howManyGuesses;
        if(builtWord === word) {
            document.getElementById("finishMessage").innerHTML = youWon;
            document.getElementById("newGame").innerHTML = "    <button id=\"newGameButton\" class=\"submitInfo\" onclick=\"newGame()\">New Game!</button>\n";
        }
    }else{
        document.getElementById("guessesRemaining").innerHTML = "No more guesses.";
        document.getElementById("hangmanImage").innerHTML = "    <img src=\"https://78.media.tumblr.com/9ad2df335c2bccdde743d3f618d19e4a/tumblr_oxru9g0dvD1vnkjhvo9_1280.png  \" alt=\"image not available\" style=\"width:100px\">\n";
        document.getElementById("finishMessage").innerHTML = youLost;
        document.getElementById("newGame").innerHTML = "    <button id=\"newGameButton\" class=\"submitInfo\" onclick=\"newGame()\">New Game!</button>\n";
    }
}

function getWord(difficulty) {
    console.log("difficulty=" + difficulty);
    var theWord = "";
    if(difficulty === "1"){
        theWord += easyWords[Math.floor(Math.random() * easyWords.length)];
    }
    if(difficulty === "2"){
        theWord += mediumWords[Math.floor(Math.random() * mediumWords.length)];
    }
    if(difficulty === "3"){
        theWord += difficultWords[Math.floor(Math.random() * difficultWords.length)];
    }
    if(difficulty === "4"){
        theWord += obscureWords[Math.floor(Math.random() * obscureWords.length)];
    }
    console.log("theWord=" + theWord);
    return theWord;
}

function guessLetter(letter) {
    var isLetterInWord = 0;
    if(guessedLetters.indexOf(letter) === -1){
        guessedLetters.push(letter);
        if(word.indexOf(letter) !== -1){
            isLetterInWord = 1;
        }else{
            guessesLeft = guessesLeft - 1;
        }
    }else{
        isLetterInWord = -1;
    }
    return isLetterInWord;
}

function printWord(letter) {
    console.log("letter=" + letter);
    var returnWord = "";
    for(var i = 0; i < word.length; i++) {
        if(word[i] === letter) {
            returnWord += letter;
        }else{
            returnWord += assembledWord[i];
        }
    }
    assembledWord = "";
    assembledWord += returnWord;
    console.log("assembledWord=" + assembledWord);
    return returnWord;
}