let currentQuestion = 0;
let answer = 0;
let questions = [
    { question: "What is ?", answer: "." },
    { question: "What is ?", answer: " .." },
    { question: "What is?", answer: "..." }
];

document.addEventListener("DOMContentLoaded", function() {
    let startGameButton = document.getElementById('start-game');
    startGameButton.addEventListener("click", startTheQuizz);
});

function startTheQuizz() {

    let container = document.getElementById("game-window"); 
    let whatDoYouKnow = document.getElementById('intro-question');
    container.removeChild(whatDoYouKnow);

//Shows first question
    let questionElement = document.getElementById("question"); 
    questionElement.textContent = questions[currentQuestion].question;

//In a different container because of styling

    //ButtonA
    let containerAnswer = document.getElementById('answers');
    let buttonA = document.createElement('button');
    buttonA.textContent = questions[currentQuestion].answer;
    buttonA.id = "answer-a";
    buttonA.setAttribute("data-type", "AnswerA");
    containerAnswer.appendChild(buttonA);

    //ButtonB
    let buttonB = document.createElement('button');
    buttonB.textContent = questions[currentQuestion].answer;
    buttonB.id = "answer-b";
    buttonA.setAttribute("data-type", "AnswerB");
    containerAnswer.appendChild(buttonB);

    //Removes Start The quizz button
    let startButton = document.getElementById('start-game');
    containerAnswer.removeChild(startButton);
}


