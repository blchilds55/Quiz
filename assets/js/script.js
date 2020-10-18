var questionsBlock = main.querySelector("#questions-container");
var answersBlock = main.querySelector("#answers-container");
var finishedBlock = main.querySelector("#finished");
var startQuiz = main.querySelector("#start-quiz");
var timer = header.querySelector("#timer");
var answerResult = footer.querySelector("#answers-results");
var initialsLabel = document.createElement("label");
var initialsInput = document.createElement("input");
var initialsSubmit = document.createElement("input");
var scoreForm = document.createElement("form");
var ansOne = document.createElement("button");
var ansTwo = document.createElement("button");
var ansThree = document.createElement("button");
var ansFour = document.createElement("button");
var dontActivate = false;
var score = [];
var taskIdCounter = 0;
var savedTasks = [];

ansOne.setAttribute("data-task-id", 0);
ansTwo.setAttribute("data-task-id", 1);
ansThree.setAttribute("data-task-id", 2);
ansFour.setAttribute("data-task-id", 3);

var p = 0;
var timeLeft = 60;

var questions = {
    questions: ["What is the name of the main character in the Alien movies?", "In George Orwell's 1984, 2 + 2 is equal to what number?"], 
    answers: [["Ripley", "Joe", "Maggie", "Susan"], ["42", "1000", "4", "5"]], 
    correct: [0, 3]};

function start() {
    main.removeChild(startQuiz);
    createAnswers();
    countdown();
}

function countdown() 
    { var timeInterval = setInterval(function() {
        if (!dontActivate) {
            timeLeft -= 1;
        }
        
        timer.textContent = ("Time left: " + timeLeft);
  
        if (timeLeft == 0 || (p == questions.questions.length)) {
            clearInterval(timeInterval);
                if (!dontActivate) {
                    finished();
                } 
        }
    }, 1000);
}
  
function createAnswers() {
    questionsBlock.textContent = questions.questions[p];

    ansOne.textContent = questions.answers[p][0];
    ansTwo.textContent = questions.answers[p][1];
    ansThree.textContent = questions.answers[p][2];
    ansFour.textContent = questions.answers[p][3];

    answersBlock.appendChild(ansOne);
    answersBlock.appendChild(ansTwo);
    answersBlock.appendChild(ansThree);
    answersBlock.appendChild(ansFour);
}

function test(event) {
    var target = event.target.getAttribute("data-task-id");
    
    if (target == questions.correct[p]) {
        answerResult.textContent = "Correct!";
    }
    else {
        answerResult.textContent = "Incorrect! The correct answer was " + questions.answers[p][questions.correct[p]] + ".";
        timeLeft -= 10;
    }
    
    p++;

    if (p < questions.questions.length) {
        createAnswers();
    }
    else {
        dontActivate = true;
        finished();
    }
}

function finished() {
    main.removeChild(answersBlock);
    questionsBlock.textContent = "All Done!";

    finishedBlock.appendChild(scoreForm);
    scoreForm.appendChild(initialsLabel);
    scoreForm.appendChild(initialsInput);
    scoreForm.appendChild(initialsSubmit);
    
    initialsLabel.textContent = "Enter your initials: "
    initialsInput.setAttribute("id", "initials");
    initialsSubmit.setAttribute("type", "submit");
}

function displayScore() {

}

function toScoreSheet(event) {
    event.preventDefault();
    questionsBlock.textContent = "High Scores:";
    finishedBlock.removeChild(scoreForm);
    saveScore();
}

function saveScore() {
    var scoreDataObj = {initials: initialsInput.value, score: timeLeft};
    scoreDataObj.id = taskIdCounter;
    score.push(scoreDataObj);
    localStorage.setItem("score", JSON.stringify(score));
    displayScore();
    taskIdCounter++;
}

function loadScores() {
    var savedTasks = localStorage.getItem("score");
  
    if (!savedTasks) {
      return false;
    }
  
    savedTasks = JSON.parse(savedTasks);

    for (var i = 0; i < savedTasks.length; i++) {
        saveScore(savedTasks[i]);
    }
}

loadScores();
startQuiz.addEventListener("click", start);
answersBlock.addEventListener("click", test);
initialsSubmit.addEventListener("click", toScoreSheet);


