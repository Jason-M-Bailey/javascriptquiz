var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// how to sort the scores high to low rather than chronological
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
  for (var i = 0; i < allScores.length; i++) {
    var createLi = document.createElement("li");
    createLi.textContent = allScores[i].initials + " -- " + allScores[i].score;
    highScore.appendChild(createLi);
  }
}

// back to home button
goBack.addEventListener("click", function () {
  window.location.replace("./index.html");
});

// clear scores button
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});