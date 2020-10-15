let interval;
let count = 0;
let totalScore = 0;
let timeCount = 9;
let timerInterval;

const printQuestion = () => {
  if (count === 0) {
    let question = document.getElementById("question");
    let questionArea = document.createElement("div");
    questionArea.setAttribute("id", "questionArea");
    questionArea.innerHTML = `${count + 1})  ${quiz[count].text}`;
    question.appendChild(questionArea);
  } else {
    let questionArea = document.getElementById("questionArea");
    questionArea.innerHTML = `${count + 1})  ${quiz[count].text}`;
  }
};

const printScore = () => {
  if (count === 0) {
    let score = document.getElementById("score");
    let scoreDiv = document.createElement("div");
    scoreDiv.setAttribute("id", "scoreDiv");
    scoreDiv.innerHTML = `Score :- ${totalScore}`;
    score.appendChild(scoreDiv);
  } else {
    let scoreDiv = document.getElementById("scoreDiv");
    scoreDiv.innerHTML = `Score :- ${totalScore}`;
  }
};

const onclick = (event) => {
  if (quiz[count - 1].selected === true) {
    return;
  }
  quiz[count - 1].selected = true;
  clearInterval(interval);
  let choice = event.target.innerHTML;
  let result = document.getElementById("result");
  if (choice === quiz[count - 1].correct) {
    event.target.classList.add("correct");
    result.innerHTML = "correct";
    totalScore += 10;
  } else {
    result.innerHTML = "wrong";
    event.target.classList.add("wrong");
  }
  setTimeout(() => {
    result.innerHTML = "";
    event.target.classList.remove("correct");
    event.target.classList.remove("wrong");
    updateQuestion();
    interval = setInterval(updateQuestion, 11000);
  }, 400);
};

const printOption = () => {
  if (count === 0) {
    let answers = document.getElementById("answers");
    for (let i = 0; i < 4; i++) {
      let eachOption = document.createElement("div");
      eachOption.addEventListener("click", (event) => {
        onclick(event);
      });
      eachOption.setAttribute("id", i.toString());
      eachOption.innerHTML = quiz[count].options[i];
      eachOption.classList.add("option");
      answers.appendChild(eachOption);
    }
  } else {
    for (let i = 0; i < 4; i++) {
      let eachOption = document.getElementById(i.toString());
      eachOption.innerHTML = quiz[count].options[i];
    }
  }
};

const displayTime = () => {
  clearInterval(timerInterval);

  let timer = document.getElementById("timer");
  timer.className = "";
  timer.classList.add("timer");
  timer.classList.add("greenColor");
  timer.innerHTML = 10;
  timeCount = 9;
  timerInterval = setInterval(() => {
    if (timeCount === 3) {
      timer.className = "";
      timer.classList.add("timer");
      timer.classList.add("redColor");
    }
    timer.innerHTML = timeCount;
    timeCount--;
  }, 1000);
};

const updateQuestion = () => {
  if (count === quiz.length) {
    setTimeout(() => {
      clearInterval(interval);
      clearInterval(timerInterval);
      // alert("game Over");
      document.getElementById("timer").innerHTML = "";
      document.getElementById("timer").className = "";
      document.getElementById("score").innerHTML = "";
      document.getElementById("question").innerHTML = ``;
      document.getElementById("answers").innerHTML = "";
      popup();
      return;
    }, 200);

    //location.reload();
  }
  printScore();
  printQuestion();
  displayTime();
  printOption();
  count++;
};

updateQuestion();
interval = setInterval(updateQuestion, 11000);
