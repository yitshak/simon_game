var gameStarted = false;
var buttonColor = ["red","blue","green","yellow"];
var userClickedPattern = [];
var currentLevel = 0;

var colorsAudioMap = new Map();
colorsAudioMap.set("red",new Audio('sounds/red.mp3'));
colorsAudioMap.set("blue",new Audio('sounds/blue.mp3'));
colorsAudioMap.set("green",new Audio('sounds/green.mp3'));
colorsAudioMap.set("yellow",new Audio('sounds/yellow.mp3'));

function PlayColorSound(color){
  if (colorsAudioMap.has(color)){
    colorsAudioMap.get(color).play();
  }

}

function RandomColorNumber() {
  return Math.floor(Math.random()*4);
}


function CheckAnswer() {
  currentIndex = userClickedPattern.length -1;
  if (userClickedPattern[currentIndex] == chosenSequence[currentIndex]){
    PlayColorSound(userClickedPattern[currentIndex]);
    if (currentIndex == chosenSequence.length-1) {
      ModifyTitle(currentLevel);
      NextSequence();
      userClickedPattern = [];
      setTimeout(function () {
        PlaySequence();
      }, 2000);

    }
  }
  else {
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    gameStarted = false;
    if (currentLevel>1){
      var levelAchived = currentLevel-1;
      $("#level-title").html("Game over <br>Achived Level "+levelAchived+ "<br>press any key to restart")
    }
    else {
      $("#level-title").html("Game Over <br>press any key to restart")
    }
  }
}

$(".btn").click( function() {
  if (gameStarted){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    var current_index = userClickedPattern.length -1;
    FlashColorButton(userChosenColor);
    CheckAnswer();
  }
})

function NextSequence() {
  randomChoosenColor = buttonColor[RandomColorNumber()];
  chosenSequence.push(randomChoosenColor);
  currentLevel += 1;
}

$(document).keydown(function() {
  if (gameStarted == false) {
    gameStarted = true;
    currentLevel = 0;
    chosenSequence = [];
    userClickedPattern = [];
    ModifyTitle(currentLevel)
    NextSequence();
    PlaySequence();
  }
})

function ModifyTitle(level) {
  $("#level-title").text("Level "+level)
}

function FlashColorButton(id) {
  $("#"+id).addClass("pressed")
  setTimeout(function () {
    $("#"+id).removeClass("pressed")
  }, 100);
}

function PlaySequence(){
  var delay = 500;
  for(var i = 0; i< chosenSequence.length; i++) {
    var color = chosenSequence[i]
    setTimeout(function (current_color) {
      FlashColorButton(current_color);
      PlayColorSound(current_color);
    }, delay, color);
    delay += 500
  }
}
