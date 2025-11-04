const questions = [
  {
    question: "👋 Who is Sk Sabir?",
    answers: [
      { text: "A Computer Science graduate passionate about tech & analytics", correct: true },
      { text: "A professional gamer", correct: false },
      { text: "A travel blogger", correct: false },
      { text: "A chef", correct: false }
    ]
  },
  {
    question: "📱 Which language does Sabir mainly use for Android apps?",
    answers: [
      { text: "Kotlin", correct: true },
      { text: "Swift", correct: false },
      { text: "Dart", correct: false },
      { text: "C#", correct: false }
    ]
  },
  {
    question: "📊 Sabir created a Financial Dashboard in which tool?",
    answers: [
      { text: "Power BI", correct: true },
      { text: "Excel", correct: false },
      { text: "Tableau Public", correct: false },
      { text: "Figma", correct: false }
    ]
  },
  {
    question: "💡 Which of the following is one of Sabir’s apps?",
    answers: [
      { text: "CookShook Recipe App", correct: true },
      { text: "WeatherNow", correct: false },
      { text: "QuizQuest", correct: false },
      { text: "Musicify", correct: false }
    ]
  },
  {
    question: "🧠 Sabir is also skilled in:",
    answers: [
      { text: "C++, DBMS & Power BI", correct: true },
      { text: "Cybersecurity", correct: false },
      { text: "3D Animation", correct: false },
      { text: "Networking only", correct: false }
    ]
  }
];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreElement = document.getElementById("score");
const totalElement = document.getElementById("total");
const finalScoreText = document.getElementById("final-score-text");

let currentQuestionIndex = 0;
let score = 0;

totalElement.innerText = questions.length;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.innerText = score;
  resultContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  nextButton.innerText = "Next ➡️";
  showQuestion();
}

function showQuestion() {
  resetState();
  const question = questions[currentQuestionIndex];
  questionElement.innerText = question.question;

  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    selectedButton.style.backgroundColor = "#4CAF50";
    score++;
    scoreElement.innerText = score;
  } else {
    selectedButton.style.backgroundColor = "#f44336";
  }

  Array.from(answerButtons.children).forEach(btn => (btn.disabled = true));
  nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) showQuestion();
  else showResult();
});

function showResult() {
  questionContainer.classList.add("hidden");
  nextButton.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  let message = "";
  if (score === questions.length) {
    message = "🔥 Perfect! You know everything about me!";
  } else if (score >= questions.length / 2) {
    message = "👏 Great job! You know me quite well!";
  } else {
    message = "🤔 Not bad! Explore my portfolio to learn more!";
  }

  finalScoreText.innerHTML = `<b>Your Score:</b> ${score}/${questions.length}<br>${message}`;
}

startGame();
