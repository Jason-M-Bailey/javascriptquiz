var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    answer: "Parentheses",
  },
  {
    title: "Arrays in Javascript can be used to store ____.",
    choices: ["Numbers And Strings", "Other Arrays", "Booleans", "All Of The Above",],
    answer: "All Of The Above",
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["Commas", "Curly brackets", "Quotes", "Parenthesis"],
    answer: "Quotes",
  },
  {
    title:
      "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "Terminal / Bash", "For Loops", "Console Log"],
    answer: "Console Log",
  },
];

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var secondsLeft = 90;
var holdInterval = 0;
var penalty = 10;
var bonus = 10;
var ulCreate = document.createElement("ul");

// when user clicks start quiz button, start the timer
timer.addEventListener("click", function () {
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      currentTime.textContent = "Time: " + secondsLeft;

      // if clock reaches 0, end game
      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        currentTime.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(questionIndex);
});

// pull the questions in from the array
function render(questionIndex) {
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {
    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].choices; // how to randomize the order of the answers?
    questionsDiv.textContent = userQuestion;
  }


  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}

// compare user answer v correct answer
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");
    if (element.textContent == questions[questionIndex].answer) {
      score++; // lets add 10 points for each correct answer
      secondsLeft = secondsLeft + bonus;
      createDiv.textContent =
        "Correct! The answer is:  " + questions[questionIndex].answer;
    } else {
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent =
        "Wrong! The correct answer is:  " + questions[questionIndex].answer;
    }
  }
  questionIndex++;

  if (questionIndex >= questions.length) {
    allDone();
    createDiv.textContent =
      "End of quiz!" +
      " " +
      "You got  " +
      score +
      "/" +
      questions.length +
      " Correct!";
  } else {
    render(questionIndex);
  }
  questionsDiv.appendChild(createDiv);
}

function allDone() {
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";
  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!";
  questionsDiv.appendChild(createH1);
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");
  questionsDiv.appendChild(createP);
  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;
    questionsDiv.appendChild(createP2);
  }

  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";
  questionsDiv.appendChild(createLabel);
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";
  questionsDiv.appendChild(createInput);
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";
  questionsDiv.appendChild(createSubmit);
  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {
      console.log("No value entered!");
    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining,
      };
      console.log(finalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);
      window.location.replace("./high-scores.html");
    }
  });
}