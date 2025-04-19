
let scoreDisplay; // Declared globally before defining it in DOM
let scoreValue = 0;
let container;
let containerAnswer;
let startGameButton;
let questions = [];
let currentQuestion;
let question;

//Fetch the array of questions and answers
fetch('assets/data/questions.json')
    .then(res => {
        console.log("Fetch response:", res);
        return res.json();
    })
    .then(data => {
        questions = data;
        console.log('Fetched questions:', questions);

        // Randomize question
        currentQuestion = Math.floor(Math.random() * questions.length);
        console.log('Random question index:', currentQuestion);
    })
    .catch(error => {
        console.error('Error fetching questions:', error);
    });

document.addEventListener("DOMContentLoaded", function () {

    startGameButton = document.getElementById('start-game');
    startGameButton.addEventListener("click", startTheQuiz);
    scoreDisplay = document.getElementById('score');
    container = document.getElementById("game-window");
    containerAnswer = document.getElementById('answers');
    question = document.getElementById("question");
    document.getElementById("start-button").addEventListener("click", () => {
        container.scrollIntoView({ behavior: "smooth" });
    });
});




/**
 * Called when start the quizz button is clicked
 * Clears the game-window for the quiz to come
 */
function startTheQuiz() {

    //Removes Start The quizz button and What do you know
    let whatDoYouKnow = document.getElementById('intro-question');
    container.removeChild(whatDoYouKnow);
    containerAnswer.removeChild(startGameButton);

    startTheQuestions();
}


/**
 * Make the questions and answers appear
 * Randomize the position of the correct answer
 */
function startTheQuestions() {

    // Clear previous answers
    containerAnswer.innerHTML = "";

    //Shows question
    let questionElement = document.getElementById("question");
    questionElement.textContent = questions[currentQuestion].question;

    //ButtonA
    let buttonA = document.createElement('button');
    buttonA.textContent = questions[currentQuestion].answer;
    buttonA.id = "answer-a";
    buttonA.setAttribute("data-type", "AnswerA");
    containerAnswer.appendChild(buttonA);

    //ButtonB
    let buttonB = document.createElement('button');
    buttonB.textContent = questions[currentQuestion].wrongAnswer;
    buttonB.id = "answer-b";
    buttonB.setAttribute("data-type", "AnswerB");
    containerAnswer.appendChild(buttonB);

    // Changes the correct answer position randomly
    let isCorrectFirst = Math.random() < 0.5;
    if (isCorrectFirst) {
        buttonA.textContent = questions[currentQuestion].answer;
        buttonB.textContent = questions[currentQuestion].wrongAnswer;
    } else {
        buttonA.textContent = questions[currentQuestion].wrongAnswer;
        buttonB.textContent = questions[currentQuestion].answer;
    }

    //Event Listener
    buttonA.addEventListener("click", handleAnswerClick);
    buttonB.addEventListener("click", handleAnswerClick);
}



/**
 * Checks if the correct answer is clicked
 * Adds 1 to score or reset to 0
 */
function handleAnswerClick(e) {

    let selected = e.target.textContent;
    let correct = questions[currentQuestion].answer;

    // removes feedback message 
    let existingMessage = document.getElementById('feedback-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    if (selected === correct) {
        scoreValue += 1;
        //alert("Correct!");   
    } else {
        scoreValue = 0;
        //alert("Wrong! Score reset to 0");  
        let feedbackMessage = document.createElement('div');
        feedbackMessage.id = 'feedback-message';
        feedbackMessage.textContent = "Wrong! Score reset to 0";
        container.appendChild(feedbackMessage);
    }

    //Add 1 to the score display
    scoreDisplay.textContent = scoreValue;

    nextQuestion();
}



/**
 * Keep the questions comming
 * Starts the array again if no more questions
 * Checks score every time
 */
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        currentQuestion = 0;
    }

    if (scoreValue >= 2) {
        endOfGame();
    } else {
        startTheQuestions();
    }
}




/**
 * End condition (temporary)
 * Confetti annimation
 */
function endOfGame() {
    if (scoreValue >= 2) {
        question.innerHTML = "Congratulations! <br><br> You are the ultimate Geek!<br><br>";
        question.style.fontSize = "5vw";
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    restartGame();
}


/**
 * Restart the quizz
 * Resets the score to 0
 */
function restartGame() {
    containerAnswer.innerHTML = "";

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.id = "restart-button";
    question.appendChild(restartButton);

    restartButton.addEventListener("click", () => {
        scoreValue = 0;
        scoreDisplay.textContent = scoreValue;
        question.style.fontSize = "1rem";
        startTheQuestions();
    });

    return;
}




















