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


    let questionElement = document.getElementById("question"); 
    questionElement.textContent = questions[currentQuestion].question;
}
