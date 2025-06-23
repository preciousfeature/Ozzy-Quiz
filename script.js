const quizData = [
  {
    question: "What band did Ozzy first rise to fame with?",
    options: {
      a: "Metallica",
      b: "Black Sabbath", // ✅ correct
      c: "AC/DC"
    },
    correct: "b"
  },
  {
    question: "What is Ozzy Osbourne’s real first name?",
    options: {
      a: "Oscar",
      b: "John", // ✅ correct
      c: "Ozric"
    },
    correct: "b"
  },
  {
    question: "Which reality TV show brought Ozzy’s family into the spotlight?",
    options: {
      a: "Rock Nation",
      b: "The Osbournes", // ✅ correct
      c: "Life with Ozzy"
    },
    correct: "b"
  },
  {
    question: "What shocking act did Ozzy perform on stage in 1982?",
    options: {
      a: "Lit a guitar on fire",
      b: "Threw blood on fans",
      c: "Bit the head off a bat" // ✅ correct
    },
    correct: "c"
  },
  {
    question: "What is the name of Ozzy Osbourne’s 1980 debut solo album?",
    options: {
      a: "Blizzard of Ozz", // ✅ correct
      b: "Diary of a Madman",
      c: "Bark at the Moon"
    },
    correct: "a"
  },
  {
    question: "Why was Ozzy banned from San Antonio in the 1980s?",
    options: {
      a: "He smashed a hotel room",
      b: "He urinated on a historic monument", // ✅ correct
      c: "He cursed at the mayor"
    },
    correct: "b"
  },
  {
    question: "Which guitarist famously played with Ozzy before dying in a plane crash?",
    options: {
      a: "Tony Iommi",
      b: "Randy Rhoads", // ✅ correct
      c: "Zakk Wylde"
    },
    correct: "b"
  }
];

// Shuffle helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Load quiz into the page
function loadQuiz() {
  const form = document.getElementById("quizForm");
  form.innerHTML = "";
  const shuffledQuestions = shuffle([...quizData]);

  shuffledQuestions.forEach((q, index) => {
    const qId = `q${index + 1}`;
    const options = shuffle(Object.entries(q.options));
    const questionBlock = document.createElement("div");
    questionBlock.classList.add("question");

    let html = `<p><strong>${index + 1}.</strong> ${q.question}</p>`;
    options.forEach(([key, text]) => {
      html += `
        <label>
          <input type="radio" name="${qId}" value="${key}">
          ${text}
        </label><br>
      `;
    });

    questionBlock.innerHTML = html;
    form.appendChild(questionBlock);
  });

  form.innerHTML += `<button type="submit">Submit Quiz</button>`;
}

document.addEventListener("DOMContentLoaded", function () {
  loadQuiz();

  document.getElementById("quizForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let score = 0;
    const form = e.target;
    const result = document.getElementById("result");
    result.innerHTML = "";

    [...form.querySelectorAll(".question")].forEach((questionDiv, index) => {
      const qId = `q${index + 1}`;
      const userAnswer = form.querySelector(`input[name="${qId}"]:checked`);
      const correct = quizData[index].correct;
      const correctLabel = questionDiv.querySelector(`input[value="${correct}"]`).parentElement;

      if (userAnswer && userAnswer.value === correct) {
        score++;
        correctLabel.style.color = "lightgreen";
      } else {
        if (userAnswer) {
          userAnswer.parentElement.style.color = "red";
        }
        correctLabel.style.color = "lightgreen";
      }
    });

    result.innerHTML = `<h2>You got ${score} out of ${quizData.length} correct!</h2>`;
  });
});
