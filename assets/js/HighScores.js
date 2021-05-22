var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear"); // clear scoreboard
var goBack = document.querySelector("#goBack"); // return to start page

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

// sorts .score in the array, descending order
allScores = allScores.sort(function (current, next) {
  return next.score - current.score;
});

// connect initials to score
// change to name 
if (allScores !== null) {
  for (var i = 0; i < allScores.length; i++) {
    var createLi = document.createElement("li");
    createLi.textContent = allScores[i].score + " -- " + allScores[i].initials; // change to name 
    highScore.appendChild(createLi);
  }
}

// back to home button
goBack.addEventListener("click", function () {
  window.location.replace("./index.html"); // takes user back to start page
});

// clear scores button
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
  window.location.replace("./index.html");
});

console.log(allScores);
console.log(highScore);
console.log(allScores[2]);
