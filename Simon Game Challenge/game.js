
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isStarted = false;

$(document).keypress(function(){
  if(!isStarted) {

    $('h1').text("level" + level);
    nextSequence();
    isStarted = True;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePressed(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length){

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    var wrongAudioSound = new Audio("sounds/wrong.mp3");
    wrongAudioSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over. Final score: " + (level - 1) + " Press any key to restart.")
    startOver()
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  isStarted = false;
}

function nextSequence() {

  userClickedPattern = [];
  level ++;
  $('h1').text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name) {

  var audioSound = new Audio("sounds/" + name + ".mp3");
  audioSound.play();
}

function animatePressed(currentColor) {

  var activeButton = $("#" + currentColor);

  activeButton.addClass("pressed");

  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
}
