
let scoreDisplay; // Declared globally before defining it in DOM
let scoreValue = 0;
let questions = [
    {
        question: "What was Mario's first appearance in a game?",
        answer: "Donkey Kong",
        wrongAnswer: "Super Mario Bros."
    },
    {
        question: "Who designed the world of 'Elden Ring'?",
        answer: "George R.R. Martin",
        wrongAnswer: "Hidetaka Miyazaki"
    },
    {
        question: "Who developed Pac-Man?",
        answer: "Namco",
        wrongAnswer: "Atari"
    },
    {
        question: "What year was the Xbox 360 released?",
        answer: "2005",
        wrongAnswer: "2006"
    },
    {
        question: "What game won the title of 'Game of the Year' at The Game Awards 2010?",
        answer: "Red Dead Redemption",
        wrongAnswer: "Halo: Reach"
    },
    {
        question: "Which company originally manufactured the Game Boy?",
        answer: "Nintendo",
        wrongAnswer: "Sega"
    },
    {
        question: "What year was the first video game console released?",
        answer: "1972",
        wrongAnswer: "1980"
    },
    {
        question: "What year did 'The Last of Us' first release?",
        answer: "2013",
        wrongAnswer: "2015"
    },
    {
        question: "What programming language was created by Dennis Ritchie?",
        answer: "C",
        wrongAnswer: "Python"
    },
    {
        question: "Who invented the World Wide Web?",
        answer: "Tim Berners-Lee",
        wrongAnswer: "Bill Gates"
    },
    {
        question: "What game introduced the character 'Aloy' in 2017?",
        answer: "Horizon Zero Dawn",
        wrongAnswer: "The Witcher 3"
    },
    {
        question: "Who is known as the father of modern computing?",
        answer: "Alan Turing",
        wrongAnswer: "Charles Babbage"
    },
    {
        question: "What year was the first iPhone released?",
        answer: "2007",
        wrongAnswer: "2010"
    },
    {
        question: "What was the first home video game console?",
        answer: "Magnavox Odyssey",
        wrongAnswer: "Atari 2600"
    }
];
let currentQuestion = Math.floor(Math.random() * questions.length);

document.addEventListener("DOMContentLoaded", function () {
    let startGameButton = document.getElementById('start-game');
    startGameButton.addEventListener("click", startTheQuizz);
    scoreDisplay = document.getElementById('score');
});




/**
 * Called when start the quizz button is clicked
 * Clears the game-window for the quiz to come
 */
function startTheQuizz() {

    //Get the containers
    let container = document.getElementById("game-window");
    let containerAnswer = document.getElementById('answers');

    //Removes Start The quizz button and What do you know
    let whatDoYouKnow = document.getElementById('intro-question');
    container.removeChild(whatDoYouKnow);
    let startButton = document.getElementById('start-game');
    containerAnswer.removeChild(startButton);

    startTheQuestions();
}


/**
 * Make the questions and answers appear
 * Randomize the position of the correct answer
 */
function startTheQuestions() {

    //Get the containers
    let container = document.getElementById("game-window");
    let containerAnswer = document.getElementById('answers');

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
    buttonA.setAttribute("data-type", "AnswerB");
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
    if (selected === correct) {
        scoreValue += 1;
        //alert("Correct!");
    } else {
        scoreValue = 0;
        alert("Wrong! Score reset to 0");
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
        question.innerHTML = "Congratulation! <br><br> You are the ultimate Geek!<br><br>";
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
    const containerAnswer = document.getElementById("answers");
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




















