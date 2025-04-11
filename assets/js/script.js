let currentQuestion = 0;
let scoreDisplay = document.getElementById('score');
let scoreValue = 0;
let questions = [
    { question: "What is ?", answer: ".", wrongAnswer: 'nope' },
    { question: "Who is ?", answer: "..", wrongAnswer: 'no' },
    { question: "When is?", answer: "...", wrongAnswer: 'nah' },
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
        question: "What game won the title of 'Game of the Year' at The Game Awards 2010?",
        answer: "Red Dead Redemption",
        wrongAnswer: "Halo: Reach"
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
    }
];

document.addEventListener("DOMContentLoaded", function () {
    let startGameButton = document.getElementById('start-game');
    startGameButton.addEventListener("click", startTheQuizz);
});



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


function startTheQuestions() {

    //Get the containers
    let container = document.getElementById("game-window");
    let containerAnswer = document.getElementById('answers');

    // End condition and restart button
    if (scoreValue >= 2) {
        question.innerHTML = "Congratulation!<br><br>You are the ultimate Geek!<br><br>";
        question.style.fontSize = "1.5rem";
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart";
        restartButton.id = "restart-button";
        question.appendChild(restartButton);

        restartButton.addEventListener("click", () => {
            scoreValue = 0;
            startTheQuestions();
        });
        return;
    }

    // Start questions again if none left in the array
    if (currentQuestion >= questions.length) {
        currentQuestion = 0;
    }

    //Shows first question
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

    //Check if you picked the correct answer
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

        //Next question, remove buttons to start function again
        currentQuestion++;
        containerAnswer.removeChild(buttonA);
        containerAnswer.removeChild(buttonB);

        //Starts function again
        startTheQuestions();
    }

    //Event Listeners
    buttonA.addEventListener("click", handleAnswerClick);
    buttonB.addEventListener("click", handleAnswerClick);

}
