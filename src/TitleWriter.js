//<body onload="startVFX('HeaderTag', 'Tobias ', 'Virmajoki', ' Larsen');">

//<h1 id="HeaderTag">ABC</h1>

//<script src="./WriteLeftToRight.js"></script>

function startVFX(_id, _prefix, _endGoal, _suffix) {
  //console.log("start");

  id = _id;
  prefix = _prefix;
  endGoal = _endGoal;
  suffix = _suffix;
  guess = " ";

  DisplayGuess();
  GuessLetter(0, GetRandom(3));
}

var id;
var millisBetweenGuesses = 250;
var millisBeforeBacktrack = 400;
var millisBetweenBacktracks = 250;

var chanceOfGuessingRight = 0.5;

var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";

var prefix;
var endGoal;
var suffix;
var guess;

function GuessLetter(currentIteration, iterationCount) {
  if (GetIsFinished()) {
    return;
  }

  if (Math.random() <= chanceOfGuessingRight) {
    //get the correct next char
    var correctChar = endGoal.substring(guess.length, guess.length + 1);
    guess += correctChar;
    //console.log("get correct letter: " + correctChar);
  } else {
    //var randomIndex = Math.floor(Math.random() * chars.length);
    //guess += chars[randomIndex];
    if (Math.random() <= 0.5) {
      guess += "0";
    } else {
      guess += "1";
    }
  }

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
  guessList = guess.split("");
  goalList = endGoal.split("");

  for (let i = 0; i < Math.min(guessList.length, goalList.length); i++) {
    if (guessList[i].localeCompare(goalList[i]) == 0) {
      continue;
    }

    return false;
  }
  return true;
}

function GetIsFinished() {
  return guess.localeCompare(endGoal) == 0;
}

function DisplayGuess() {
  //console.log("display");
  document.getElementById(id).innerHTML = prefix + guess + suffix;
}

function Backtrack() {
  //remove last char
  guess = guess.substring(0, guess.length - 1);

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
