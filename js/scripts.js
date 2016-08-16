// back end logic

function lettersToHide(tempString) {
  var tempArray = [];
  var lettersArray = tempString.split("");
  lettersArray.forEach(function(letter) {
    if (!tempArray.includes(letter)) {
      tempArray.push(letter);
    }
  });
  return tempArray;
};

function maskWord(word, letterArray) {
  var wordArr = word.split("");
  wordArr.forEach(function(letter, index) {
    if(letterArray.includes(letter)){
      wordArr[index] = "_";
    }
  });
  return wordArr.join("");
};

function removeArrayElement(letterArray, letter) {
  var i = letterArray.indexOf(letter);
  if (i != -1) {
    letterArray.splice(i, 1);
  }
};

function wrongLetter(wrongLetterArray, letter) {
  if (!wrongLetterArray.includes(letter)) {
    wrongLetterArray.push(letter);
    $("ul").append(letter);
    $("#hangmanImg").remove();
    $("#gameplay").append("<img id='hangmanImg' src='img/" + wrongLetterArray.length + ".jpg'</img>")
  }
};

function addArrayElement(letterArray, element) {
  // function not currently used
  letterArray.push(element);
  return letterArray;
};

function displayString(wordToShow) {
  $("#wordDisplay").text("");
  var tempArray = wordToShow.split("");
  tempArray.forEach(function(letter) {
    $("#wordDisplay").append(letter + " ");
  });
  // $("#wordDisplay").append(wordToShow);
};

function endGame(word) {
  $("#incorrectWord").text(word);
  $("#gameover").show();
  $("#gameplay").hide();
};

function isGameOver(wrongLetterArray) {
  if (wrongLetterArray.lengh >= 6) {
    return true;
  } else {
    return false;
  }
};

// front end logic

$(document).ready(function() {
  var word, letterArray;
  var wrongLetterArray = [];
  var randomWords = ["knapsack", "rickshaw", "xylophone", "razzmatazz", "megahertz", "bayou", "microwave", "yachtsman", "whomever", "vaporize"]
  var wrongGuesses = 0;
  $("#userInput").submit(function(event) {
    $("#letterForm").show();
    word = $("#wordInput").val().toUpperCase();
    letterArray = lettersToHide(word);
    displayString(maskWord(word, letterArray));
    $(".hideMe").hide();
    event.preventDefault();
  });

  $("#letterForm").submit(function(event) {
    var userInput = $("#letterInput").val().toUpperCase();
    if (userInput.length === 1) {
      if(!letterArray.includes(userInput)) {
        wrongLetter(wrongLetterArray, userInput)
      }
        removeArrayElement(letterArray, userInput);
      if (wrongLetterArray.length >=6) {
        endGame(word);
      }
      displayString(maskWord(word,letterArray));
    } else {
      alert("Please enter a single letter");
    }
    if (word === maskWord(word, letterArray)) {
      $("#gameplay").hide();
      $("#correctWord").text(word);
      $("#winner").show();
    }
    $("#letterInput").val("");
    event.preventDefault();
  });

  $("#randomBtn").click(function() {
    var randomNum = (Math.floor(Math.random() * 10));
    word = randomWords[randomNum];
    $("#letterForm").show();
    word = word.toUpperCase();
    letterArray = lettersToHide(word);
    $(".hideMe").hide();
    displayString(maskWord(word, letterArray));
  });
});
