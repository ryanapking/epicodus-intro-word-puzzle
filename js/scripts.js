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
}

function maskWord(word, letterArray) {
  var wordArr = word.split("");
  wordArr.forEach(function(letter, index) {
    if(letterArray.includes(letter)){
      wordArr[index] = "-";
    }
  });
  return wordArr.join("");
};

function removeArrayElement(letterArray, letter) {
  var i = letterArray.indexOf(letter);
  if (i != -1) {
    letterArray.splice(i, 1);
    return true; //removed an element
  } else {
    return false; //did not match and remove an element
  }
};

function wrongLetter(wrongLetterArray, letter) {
  if (!wrongLetterArray.includes(letter)) {
    wrongLetterArray.push(letter);
    $("ul").append(letter);
    $("#hangmanImg").remove();
    $("#gameplay").append("<img id='hangmanImg' src='img/" + wrongLetterArray.length + ".jpg'</img>")
  }
}

function addArrayElement(letterArray, element) {
  // function not currently used
  letterArray.push(element);
  return letterArray;
}

function displayString(wordToShow) {
  $("#wordDisplay").text("");
  $("#wordDisplay").append(wordToShow);
};

function endGame(word) {
  $("#incorrectWord").text(word);
  $("#gameover").show();
  $("#gameplay").hide();
}

// front end logic

$(document).ready(function() {
  var word, letterArray;
  var wrongLetterArray = [];
  var randomWords = ["knapsack", "rickshaw", "xylophone", "razzmatazz", "megahertz", "bayou", "microwave", "yachtsman", "whomever", "vaporize"]
  var wrongGuesses = 0;
  $("#userInput").submit(function(event) {
    $("#userInput").hide();
    $("#letterForm").show();
    word = $("#wordInput").val().toUpperCase();
    letterArray = lettersToHide(word);
    var hiddenWord = maskWord(word, letterArray);
    displayString(hiddenWord);
    event.preventDefault();
  });

  $("#letterForm").submit(function(event) {
    var userInput = $("#letterInput").val().toUpperCase();
    if (userInput.length === 1) {
      if (!removeArrayElement(letterArray, userInput)) {
        wrongLetter(wrongLetterArray, userInput);
      }
      if (wrongLetterArray.length >=6) {
        endGame(word);
      }
      var hiddenWord = maskWord(word, letterArray);
      displayString(hiddenWord);
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
    $("#userInput").hide();
    $("#letterForm").show();
    word = word.toUpperCase();
    letterArray = lettersToHide(word);
    var hiddenWord = maskWord(word, letterArray);
    displayString(hiddenWord);
  });
});
