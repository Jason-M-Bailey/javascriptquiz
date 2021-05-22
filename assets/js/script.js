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
    title: "Arrays in Javascript cannot be used to store ____.",
    choices: ["Numbers And Strings", "Other Arrays", "Booleans", "Functions"],
    answer: "Functions",
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
var count = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var secondsLeft = 60;
var holdInterval = 0;
var penalty = 10;
var bonus = 10;
var ulCreate = document.createElement("ul");

// when user clicks start quiz button, start the timer
timer.addEventListener("click", function () {
  // homework reviewer, my TAs and tutors could not figure this one out: why does the timer take a second to render? 

  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      currentTime.textContent = secondsLeft + " seconds left";
      secondsLeft--;

      // if clock reaches 0, end game
      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
      }
    }, 1000);
  }
  render(questionIndex);
});

// pull the questions in from the array
function render(questionIndex) {
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";

  // loop through the questions
  for (var i = 0; i < questions.length; i++) {
    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].choices;
    questionsDiv.textContent = userQuestion;
  }

  // randomize order of multiple choice
  questions[questionIndex].choices = questions[questionIndex].choices.sort(
    function () {
      return Math.random() - 0.5;
    }
  );

  // create multiple choice
  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);

    // compare user click v correct answer
    listItem.addEventListener("click", compare);
  });
}

// compare user answer v correct answer
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");

    // add time for correct answer
    if (element.textContent == questions[questionIndex].answer) {
      secondsLeft = secondsLeft + bonus;
      score = score + 1; // add 1 to score for each correct answer for final tally
      count = count + 1; // used for displaying current questions answered 
      createDiv.textContent = "Correct! 10 seconds added! You have " + score + " of " + count + " correct so far.";
    } else {
      // deduct time for incorrect answer
      secondsLeft = secondsLeft - penalty;
      count = count + 1;
      createDiv.textContent = "Wrong! 10 seconds deducted! You have " + score + " of " + count + " correct so far.";
    }
  }

  // move on to next question
  questionIndex++;

  // when out of questions...
  if (questionIndex >= questions.length) {
    allDone();
    createDiv.textContent =
      "End of quiz! You got  " +
      score +
      " of " +
      questions.length +
      " correct.";
  } else {
    render(questionIndex);
  }
  questionsDiv.appendChild(createDiv);
}

// out of questions screen
function allDone() {
  // clear screen of old content
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";

  // create new content to display
  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!";
  questionsDiv.appendChild(createH1);

  // more new content
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

  // more new content
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your name: ";
  questionsDiv.appendChild(createLabel);

  // input field for name
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "name");
  createInput.textContent = "";
  questionsDiv.appendChild(createInput);

  // submit button
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";
  questionsDiv.appendChild(createSubmit);

  //
  createSubmit.addEventListener("click", function () {
    var name = createInput.value; 

    if (name === null) {
      console.log("No value entered!");
    } else {
      var finalScore = {
        name: name, 
        score: timeRemaining,
      };
      console.log(finalScore);

      // use local storage to populate high scores page
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
