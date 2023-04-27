//<body onload="startVFX('HeaderTag', 'Tobias ', 'Virmajoki', ' Larsen');">

//<h1 id="HeaderTag">ABC</h1>

//<script src="./WriteLeftToRight.js"></script>

function startVFX(_id, _prefix, _endGoal, _suffix) {
  id = _id;
  prefix = _prefix;
  endGoal = _endGoal;
  suffix = _suffix;

  guess = Array(_endGoal.length).fill("&nbsp;");

  DisplayGuess();
  GuessLetter(0, GetRandom(3));
}

var id;
var millisBetweenGuesses = 50;
var millisBeforeBacktrack = 200;
var millisBetweenBacktracks = 150;

var chanceOfGuessingRight = 0.75;

var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";

var prefix;
var endGoal;
var suffix;
var guess;
var currentIndex = 0;

function GuessLetter(currentIteration, iterationCount) {
  if (GetIsFinished()) {
    console.log("complete");
    return;
  }

  if (Math.random() <= chanceOfGuessingRight) {
    //get the correct next char
    var correctChar = endGoal.substring(currentIndex, currentIndex + 1);
    guess[currentIndex] = correctChar;
  } else {
    if (Math.random() <= 0.5) {
      guess[currentIndex] = "0";
    } else {
      guess[currentIndex] = "1";
    }
  }
  currentIndex += 1;

  DisplayGuess();

  if (currentIteration < iterationCount) {
    setTimeout(
      GuessLetter,
      millisBetweenGuesses,
      currentIteration + 1,
      iterationCount
    );
    return;
  }

  if (GetIsFinished()) {
    return;
  } else if (GetIsOnPath()) {
    setTimeout(GuessLetter, millisBetweenGuesses, 0, GetRandom(3));
  } else {
    setTimeout(Backtrack, millisBeforeBacktrack);
  }
}

function GetIsOnPath() {
  if (currentIndex == 0) {
    return true;
  }

  currentGuess = guess.join("").substring(0, currentIndex);

  var result = currentGuess === endGoal.substring(0, currentIndex);

  //console.log(currentGuess + " is on path to " + endGoal + ": " + result);

  return result;
}

function GetIsFinished() {
  //return guess.localeCompare(endGoal) == 0;
  currentGuess = guess.join("");
  return currentGuess === endGoal;
}

function DisplayGuess() {
  currentGuess = guess.join("");
  document.getElementById(id).innerHTML = prefix + currentGuess + suffix;
}

function Backtrack() {
  //remove last char
  guess[currentIndex] = "&nbsp";
  currentIndex -= 1;

  DisplayGuess();

  if (GetIsOnPath()) {
    setTimeout(GuessLetter, millisBetweenGuesses, 0, GetRandom(3));
  } else {
    setTimeout(Backtrack, millisBetweenBacktracks);
  }
}

function GetRandom(max) {
  return Math.floor(Math.random() * max);
}

/*
function ReplaceCharAtIndex(string, index, newVal) {
  return string.substring(0, index) + newVal + string.substring(index + 1);
}*/
