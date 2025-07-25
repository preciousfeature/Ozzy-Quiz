const quizData = [
  {
    question: "What band did Ozzy first rise to fame with?",
    options: { a: "Metallica", b: "Black Sabbath", c: "AC/DC" },
    correct: "b"
  },
  {
    question: "What is Ozzy Osbourne’s real first name?",
    options: { a: "Oscar", b: "John", c: "Ozric" },
    correct: "b"
  },
  {
    question: "Which reality TV show brought Ozzy’s family into the spotlight?",
    options: { a: "Rock Nation", b: "The Osbournes", c: "Life with Ozzy" },
    correct: "b"
  },
  {
    question: "What shocking act did Ozzy perform on stage in 1982?",
    options: { a: "Lit a guitar on fire", b: "Threw blood on fans", c: "Bit the head off a bat" },
    correct: "c"
  },
  {
    question: "What is the name of Ozzy Osbourne’s 1980 debut solo album?",
    options: { a: "Blizzard of Ozz", b: "Diary of a Madman", c: "Bark at the Moon" },
    correct: "a"
  },
  {
    question: "Why was Ozzy banned from San Antonio in the 1980s?",
    options: { a: "He smashed a hotel room", b: "He urinated on a historic monument", c: "He cursed at the mayor" },
    correct: "b"
  },
  {
    question: "Which guitarist famously played with Ozzy before dying in a plane crash?",
    options: { a: "Tony Iommi", b: "Randy Rhoads", c: "Zakk Wylde" },
    correct: "b"
  }
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuffledQuestions = [];

function loadQuiz() {
  const form = document.getElementById("quizForm");
  form.innerHTML = "";
  shuffledQuestions = shuffle([...quizData]);

  shuffledQuestions.forEach((q, index) => {
    const qId = `q${index + 1}`;
    const options = shuffle(Object.entries(q.options));
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question");

    let html = `<p><strong>${index + 1}.</strong> ${q.question}</p>`;
    options.forEach(([key, text]) => {
      html += `
        <div>
          <label>
            <input type="radio" name="${qId}" value="${key}">
            ${text}
          </label>
        </div>
      `;
    });

    questionBlock.innerHTML = html;
    form.appendChild(questionBlock);
  });

  form.innerHTML += `<button type="submit" id="submitBtn">Submit Quiz</button>`;
}

function generateImage(playerName, score, total) {
  const resultDiv = document.getElementById("result");
  resultDiv.classList.add("certificate");

  resultDiv.innerHTML = `
    <h2>🎸 Ozzy Osbourne Quiz Results 🎸</h2>
    <p><strong>Name:</strong> ${playerName}</p>
    <p><strong>Score:</strong> ${score} / ${total}</p>
    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    <p>Keep rockin' 🤘</p>
  `;

  html2canvas(resultDiv).then(canvas => {
    const link = document.createElement("a");
    link.download = `${playerName}_ozzy_quiz.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadQuiz();

  const form = document.getElementById("quizForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitted";

    const playerName = document.getElementById("playerName").value.trim();
    if (!playerName) {
      alert("Please enter your name before submitting the quiz.");
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Quiz";
      return;
    }

    let score = 0;
    const questionDivs = document.querySelectorAll(".question");

    questionDivs.forEach((div, index) => {
      const qId = `q${index + 1}`;
      const question = shuffledQuestions[index];
      const correctAnswer = question.correct;
      const selected = document.querySelector(`input[name="${qId}"]:checked`);

      div.querySelectorAll("label").forEach(l => l.style.color = "");
      if (selected && selected.value === correctAnswer) {
        score++;
      }
    });

    questionDivs.forEach((div, index) => {
      const qId = `q${index + 1}`;
      const question = shuffledQuestions[index];
      const correctAnswer = question.correct;
      const selected = document.querySelector(`input[name="${qId}"]:checked`);
      const correctInput = div.querySelector(`input[value="${correctAnswer}"]`);
      const correctLabel = correctInput?.parentElement;

      if (selected) {
        if (selected.value === correctAnswer) {
          selected.parentElement.style.color = "lightgreen";
        } else {
          selected.parentElement.style.color = "red";
          if (correctLabel) correctLabel.style.color = "lightgreen";
        }
      } else {
        if (correctLabel) correctLabel.style.color = "lightgreen";
      }
    });

    generateImage(playerName, score, shuffledQuestions.length);
  });
});
