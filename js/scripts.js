// back end logic

function lettersToHide(tempString) {
  var lettersArray = tempString.split("");
  return lettersArray;
}

function maskWord(word, letterArray) {
  var hiddenWord = word;
  letterArray.forEach(function(letter) {
    hiddenWord = hiddenWord.replace(letter, "-");
  });
  return hiddenWord;
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

function endGame() {
  $("#gameover").show();
  $("#gameplay").hide();
}

// front end logic

$(document).ready(function() {
  var word, letterArray;
  var wrongLetterArray = [];
  var wrongGuesses = 0;
  $("#userInput").submit(function(event) {
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
        endGame();
      }
      var hiddenWord = maskWord(word, letterArray);
      displayString(hiddenWord);
    } else {
      alert("Please enter a single letter");
    }
    $("#letterInput").val("");
    event.preventDefault();
  });
});
