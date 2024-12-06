const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Hyperlink Markup Language",
      "Hyper Text Main Language",
      "Hyper Markup Language",
    ],
    correct: 1,
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["text-color", "font-color", "color", "text-style"],
    correct: 3,
  },
  {
    question: "Which tag is used to link an external JavaScript file?",
    options: ["<link>", "<script>", "<js>", "<javascript>"],
    correct: 2,
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    options: ["String", "Boolean", "Element", "Number"],
    correct: 3,
  },
  {
    question: "Which method is used to add an event listener in JavaScript?",
    options: ["addEvent()", "attachEvent()", "addListener()", "addEventListener()"],
    correct: 4,
  },
  {
    question: "Which of the following is used to create a responsive layout?",
    options: ["Media queries", "Grids only", "Tables", "Div tags"],
    correct: 1,
  },
];

let currentQuestionIndex = 0;
let score = 0;

const loginPage = document.getElementById("login-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");
const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");
const nextButton = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  loginPage.classList.add("hidden");
  quizPage.classList.remove("hidden");
  loadQuestion();
});

function loadQuestion() {
  resetOptions();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionButtons.forEach((button, index) => {
    button.textContent = currentQuestion.options[index];
    button.onclick = () => selectAnswer(index + 1);
  });
}
function resetOptions() {
  optionButtons.forEach((button) => {
    button.classList.remove("correct", "wrong");
    button.disabled = false;
  });
  nextButton.classList.add("hidden");
}
function selectAnswer(selected) {
  const currentQuestion = questions[currentQuestionIndex];
  optionButtons.forEach((button, index) => {
    if (index + 1 === currentQuestion.correct) {
      button.classList.add("correct");
    } else if (index + 1 === selected) {
      button.classList.add("wrong");
    }
    button.disabled = true;
  });
  if (selected === currentQuestion.correct) {
    score++;
  }
  nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizPage.classList.add("hidden");
  resultPage.classList.remove("hidden");
  scoreEl.textContent = `${score}/${questions.length}`;
}
document.getElementById("restart-btn").addEventListener("click", () => {
  location.reload();
});
