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

// what if? create user choice on how many questions to answer
// multiply time * user choice of # of questions

// user gets 50/50 - button to eliminate 2 wrong answers
// on.click...
// append answer as first li
// evaluate index != answer, if true append

// correct answer in last spot of array
// randomly generate 1-4
// if questions.choice = answer
// append.correct answer

var score = 0;
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
  // why does timer take a second to render?

  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      currentTime.textContent = secondsLeft + " seconds left";
      secondsLeft--;

      // if clock reaches 0, end game
      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        // currentTime.textContent = ""; // removed "Time's up!"
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

  // console.log(questions[questionIndex].choices, "before")

  // randomize order of multiple choice
  questions[questionIndex].choices = questions[questionIndex].choices.sort(
    function () {
      return Math.random() - 0.5;
    }
  );

  // console.log(questions[questionIndex].choices, "after")

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
      createDiv.textContent = "Correct! 10 seconds added!";
    } else {
      // deduct time for incorrect answer
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent = "Wrong! 10 seconds deducted!";
    }
  }

  // move on to next question
  questionIndex++;

  // when out of questions...
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

// out of questions screen
function allDone() {
  // clear screen of old content
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";

  // challenge: display different content for 0 correct, 1 correct, etc...

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
  createInput.setAttribute("id", "initials"); // update initials to name
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
    var initials = createInput.value; // update to name

    if (initials === null) {
      // update to name
      console.log("No value entered!");
    } else {
      var finalScore = {
        initials: initials, // update to name
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
