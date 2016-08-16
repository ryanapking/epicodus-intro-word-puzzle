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
  letterArray.splice(i, 1);
  return letterArray;
};

function addArrayElement(letterArray, element) {
  // function not currently used
  letterArray.push(element);
  return letterArray;
}

function displayString(wordToShow) {
  $("h3").text("");
  $("h3").append(wordToShow);
};


$(document).ready(function() {
  var word, letterArray;
  $("#userInput").submit(function(event) {
    word = $("#wordInput").val();
    letterArray = lettersToHide(word);
    var hiddenWord = maskWord(word, letterArray);
    displayString(hiddenWord);
    event.preventDefault();
  });

  $("#letterForm").submit(function(event) {
    var userInput = $("#letterInput").val();
    removeArrayElement(letterArray, userInput);
    var hiddenWord = maskWord(word, letterArray);
    displayString(hiddenWord);
    event.preventDefault();
  });
});
