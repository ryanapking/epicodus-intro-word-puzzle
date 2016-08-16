var word = "";
var hiddenWord = "";
var vowels = ["a", "e", "i", "o", "u"]

$(document).ready(function() {
  $("#userInput").submit(function(event) {
    hiddenWord = word = $("#wordInput").val();
    replaceLetters();
    displayString(hiddenWord);
    $("#wordInput").val("");
    event.preventDefault();
  });

  $("#vowelInput").submit(function(event) {
    var letter = $("#letterInput").val();
    if (letter.length === 1) {
      showLetter(letter);
    } else {
      alert("please enter a single vowel");
    }
    $("#letterInput").val("");
    event.preventDefault();
  });
});

function replaceLetters() {
  hiddenWord = word;
  vowels.forEach(function(letter) {
    hiddenWord = hiddenWord.replace(letter, "-");
  });
};

function showLetter(letter) {
  var i = vowels.indexOf(letter);
  vowels.splice(i, 1);
  replaceLetters();
  displayString(hiddenWord);
};

function displayString(wordToShow) {
  $("h3").text("");
  $("h3").append(wordToShow);
};
