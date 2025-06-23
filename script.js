document.getElementById("quizForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let score = 0;

  const answers = {
    q1: "b", // Black Sabbath
    q2: "b", // John
    q3: "b", // The Osbournes
    q4: "c", // Bit the head off a bat
    q5: "a", // Blizzard of Ozz
    q6: "b", // Urinated on monument
    q7: "b"  // Randy Rhoads
  };

  for (let key in answers) {
    const userAnswer = document.querySelector(`input[name="${key}"]:checked`);
    if (userAnswer && userAnswer.value === answers[key]) {
      score++;
    }
  }

  const totalQuestions = Object.keys(answers).length;
  document.getElementById("result").innerText = `You got ${score} out of ${totalQuestions} correct!`;
});
