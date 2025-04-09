let currentQuestion = 0;
let answer = 0;
let questions = [
    { question: "What is ?", answer: ".", wrongAnswer: 'nope' },
    { question: "What is ?", answer: "..", wrongAnswer: 'no' },
    { question: "What is?", answer: "...", wrongAnswer: 'nah' }
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
            // add score += 1;
            alert("Correct!");
        } else {
            // go back score = 0;
            alert("Wrong! Score reset to 0");
        }
    }


    //Event Listeners
    buttonA.addEventListener("click", handleAnswerClick);
    buttonB.addEventListener("click", handleAnswerClick);
}
