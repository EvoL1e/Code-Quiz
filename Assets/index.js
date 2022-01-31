// Grab the required elements from the html to manipulate later
let questionnaires = document.querySelector(#questionnaires);
let startButton = document.querySelector(#start-button);
let restartButton = document.querySelector(#restart-button);
let gameClock = document.querySelector(#game-clock);
let result = document.querySelector(#game-result);
let userHighScore = document.querySelector(#user-high-score)
let userInitials = document.querySelector(#user-initials)

// Create required variables for the game
let score = 0;
let timer = 60;
let currentQuestion = 0;
let timerDeficit = 5;

// Create the Questionnaires
let quizQuestionnaires = [
    {
        question: "1. What does HTML stand for?",
        answers: ["A. HyperText Markup Language", "B. Hyperbolic Text MArkup Language", "C. HTML is HTML"], 
        correctAnswer: ["A. HyperText Markup Language"]
    },
    {
        question: "2. What does JS stand for?",
        answers: ["A. Jason S ", "B. Javascript", "C. It doesn't stand for anything"], 
        correctAnswer: ["B. Javascript"]
    },
    {
        question: "3. Why do we comment?",
        answers: ["A. To make others read more", "B. To add an extra line to the code", "C. To make it easier to understand what we're doing for others"], 
        correctAnswer: ["C. To make it easier to understand what we're doing for others"]
    },
    {
        question: "4. What is GitHub?",
        answers: ["A. A social media platform", "B. A platform where people can host their code and share their code for others", "C. A random website"], 
        correctAnswer: ["B. A platform where people can host their code and share their code for others"]
    },


];

function timerCountdown(score) {
    let interval = setInterval(function() {
        gameClock.innerHTML = timer + "seconds remaining";
        timer--;

        if(timer === 0) {
            clearInterval(interval);
            gameClock.innerHTML = "Time's Up"
            endGame(score);
        }

    }, 1000);
};

function answeredWrong() {
    timer -= timerDeficit;
    result.innerHTML = "Sorry but you got that question incorrect"
    return;
};

function answeredCorrect() {
    result.innerHTML = "Great Job! You answered correctly"
    score++
    return;
};


function beginGame() {
    // Clear area
    questionnaires.innerHTML = "";

    // Create header to show question
    let question = quizQuestionnaires[currentQuestion]
    let questionHeader = document.createElement("h2");

    // Add the newly created header with a question and append to the questionnaires
    questionHeader.textContent=question.questionAsked;
    questionnaires.appendChild(questionHeader);

    for (let i = 0; i < question.answers.length; i++) {
        let answerButton = document.createElement("button");
        answerButton.textContent = question.answers[i];
        questionnaires.appendChild(answerButton);
    
        // Make answers clickable
        answerButton.addEventListener("click", function (event) {
          console.log(event.target.innerHTML);
          let btnAnswer = event.target.innerHTML;

          // Check if the
          if (btnAnswer !== question.correctAnswer) {
            answeredWrong();
          }
          else if (btnAnswer === question.correctAnswer) {
            answeredCorrect();
          }
          
          // Check if all the questions have been iterated through
          if (currentQuestionSpot < quizQuestions.length) {
            currentQuestion++;
            beginGame();
          } else { endGame(score); }
        });
    }
};

function endGame() {
    questionnaires.innerHTML = "";
    result.innerHTML = "You answered" + score + "questions correctly!"
    if (score > highScore) {
        highScore(score);
    }
};

function highScore(score) {
    let highScorePrompt = prompt("Congratulations! You got a new high score. PLease enter your initials.", "Initials");
    
    if (highScorePrompt = null) 
        {prompt("You left the prompt empty! Please enter your initials,", "Initials")};
    
    userInitials.innerHTML = highScorePrompt;
    userHighScore.innerHTML = score;
};

function restartGame() {
    window.location.reload();
};

startButton.addEventListener("click", beginGame);
startButton.addEventListener("click", timerCountdown);
restartButton.addEventListener("click", restartGame);
