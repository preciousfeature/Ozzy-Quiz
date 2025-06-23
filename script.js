document.getElementById("quizForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let score = 0;

  // Example answer check
  const answers = {
    q1: "b",
    // add others like q2: "a", q3: "c"
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
