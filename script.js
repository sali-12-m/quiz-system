const questions = [
  {
    question: "What is the capital city of Canada?",
    answers: [
      { choice: "Toronto", correct: false },
      { choice: "Vancouver", correct: false },
      { choice: "Ottawa", correct: true },
      { choice: "Montreal", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { choice: "Venus", correct: false },
      { choice: "Mars", correct: true },
      { choice: "Jupiter", correct: false },
      { choice: "Mercury", correct: false }
    ]
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { choice: "Atlantic Ocean", correct: false },
      { choice: "Indian Ocean", correct: false },
      { choice: "Arctic Ocean", correct: false },
      { choice: "Pacific Ocean", correct: true }
    ]
  },
  {
    question: "Which element has the chemical symbol Au?",
    answers: [
      { choice: "Silver", correct: false },
      { choice: "Gold", correct: true },
      { choice: "Aluminum", correct: false },
      { choice: "Copper", correct: false }
    ]
  },
  {
    question: "In which country are the pyramids of Giza located?",
    answers: [
      { choice: "Mexico", correct: false },
      { choice: "Greece", correct: false },
      { choice: "Egypt", correct: true },
      { choice: "Peru", correct: false }
    ]
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { choice: "Vincent van Gogh", correct: false },
      { choice: "Pablo Picasso", correct: false },
      { choice: "Michelangelo", correct: false },
      { choice: "Leonardo da Vinci", correct: true }
    ]
  },
  {
    question: "How many continents are there on Earth?",
    answers: [
      { choice: "5", correct: false },
      { choice: "6", correct: false },
      { choice: "7", correct: true },
      { choice: "8", correct: false }
    ]
  },
  {
    question: "What is the currency of Japan?",
    answers: [
      { choice: "Won", correct: false },
      { choice: "Yen", correct: true },
      { choice: "Yuan", correct: false },
      { choice: "Ringgit", correct: false }
    ]
  },
  {
    question: "Which animal is the fastest on land?",
    answers: [
      { choice: "Lion", correct: false },
      { choice: "Horse", correct: false },
      { choice: "Cheetah", correct: true },
      { choice: "Leopard", correct: false }
    ]
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    answers: [
      { choice: "Oxygen", correct: false },
      { choice: "Nitrogen", correct: false },
      { choice: "Hydrogen", correct: false },
      { choice: "Carbon Dioxide", correct: true }
    ]
  }
];
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressElement = document.getElementById("progress");
const timer = document.getElementById("timer");

const quizBox = document.querySelector(".quiz");
const resultBox = document.getElementById("result");

const scoreText = document.getElementById("scoreText");
const correctText = document.getElementById("correctText");
const incorrectText = document.getElementById("incorrectText");
const unansweredText = document.getElementById("unansweredText");
const resultMessage = document.getElementById("resultmessage");

let currentQuestion = 0;
let correctCount = 0;
let incorrectCount = 0;
let unansweredCount = 0;

let answered = Array(questions.length).fill(false);

let timeLeft = 30;
let countdown;

function startTimer() {
    clearInterval(countdown);
    timeLeft = 30;
    timer.textContent = timeLeft;
    countdown = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            if (!answered[currentQuestion]) {
                unansweredCount++;
                answered[currentQuestion] = true;
            }
            nextQuestion();
        }
    }, 1000);
}

function showQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;

    progressElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;
    answersElement.innerHTML = "";

    q.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("bu");
        button.textContent = answer.choice;

        button.addEventListener("click", () => {
            if (answered[currentQuestion]) return;
            answered[currentQuestion] = true;
            clearInterval(countdown);
            const allButtons = answersElement.querySelectorAll("button");
            allButtons.forEach(btn => btn.disabled = true);

            if (answer.correct) {
                correctCount++;
                button.style.border = "2px solid green";
            } else {
                incorrectCount++;
                button.style.border = "2px solid red";
            }

            setTimeout(() => {
                nextQuestion();
            }, 700);
        });

        answersElement.appendChild(button);
    });

    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === questions.length - 1;

    startTimer();
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        clearInterval(countdown);
        showResults();
    }
}

prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
});

function showResults() {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    const total = questions.length;
    const percentage = Math.round((correctCount / total) * 100);
    scoreText.textContent = `Score: ${correctCount}/${total} (${percentage}%)`;
    correctText.textContent = `Correct Answers: ${correctCount}`;
    incorrectText.textContent = `Incorrect Answers: ${incorrectCount}`;
    unansweredText.textContent = `Unanswered: ${unansweredCount}`;
     if (percentage <= 40) {
        resultMessage.textContent = "Needs Improvement";
    } 
    else if (percentage <= 70) {
        resultMessage.textContent = "Good Effort";
    } 
    else if (percentage <= 90) {
        resultMessage.textContent = "Great Work";
    } 
    else {
        resultMessage.textContent = "Excellent";
    }
}
function restartQuiz() {
    currentQuestion = 0;
    correctCount = 0;
    incorrectCount = 0;
    unansweredCount = 0;
    answered = Array(questions.length).fill(false);
    resultBox.style.display = "none";
    quizBox.style.display = "block";
    showQuestion();
}
showQuestion();