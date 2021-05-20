var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// how to sort the scores high to low rather than chronological -
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

// sorts .score in the array, descending order 
allScores = allScores.sort(function (current, next) {
  return next.score - current.score
});

if (allScores !== null) {
  for (var i = 0; i < allScores.length; i++) {
    var createLi = document.createElement("li");
    createLi.textContent = allScores[i].score + " -- " + allScores[i].initials;
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
});

console.log(allScores);
console.log(highScore);
console.log(allScores[2]);