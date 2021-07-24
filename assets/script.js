// Variables declared at startup
const quizEl = document.getElementById('quizContent')
const timerEl = document.getElementById('timerContent')
const startButton = document.getElementById('start')
const submitButton = document.getElementById('submitQuiz')
// This variable will give us our questions for the quiz, it is setup as an array with object literals
const quizSource = [
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "c"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "c"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "ESLint"
    },
    correctAnswer: "c"
  }
];
let timer = 61
submitButton.classList.add('invisible')
let score = 0
let didWin = ''
// Add event listener to start startButton, this will start a function that encloses all of our functions and starts the quiz
startButton.addEventListener('click', function () {
  // Declare functions
  buildQuiz()
  function buildQuiz() {
    const output = []
    submitButton.classList.remove('invisible')
    quizSource.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for (letter in currentQuestion.answers) {

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" class="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizEl.innerHTML = output.join('');
  }
  function gameOver() {
    alert('GAME OVER')
    timer = 61
    timerEl.innerHTML = ""
    startButton.classList.remove('invisible')
  }
  function loseGame() {
    alert('wrong answer')
    timer -= 5
    nextSlide()
    didWin = ''
  }
  function winGame() {
    alert('YOU WON!')
    timer += 5
    score += 1
    console.log(score)
    nextSlide()
    didWin = ''
  }
  submitButton.addEventListener('click', function () {
    var userInput = ''
    radio = document.querySelectorAll('.question0')
    radio.forEach(function(button){
      if(button.checked){

       userInput = button.value

       console.log(userInput)
       console.log(quizSource.correctAnswer)
      }
      if(userInput === quizSource.correctAnswer){
        didWin = true
      }
      else{
        didWin = false
      }
    })
  })
  // additional variables to select slides (allows us to control which question is visible at a given time)
  
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  slides[currentSlide].classList.add('activeSlide')
  
  
  startTimer()


  function startTimer() {
    startButton.classList.add('invisible')
    var set = setInterval(function () {
      if (timer === 0) {
        clearInterval(set)
        gameOver()
      }
      else if (didWin === true) {
        winGame()
      }
      else if (didWin === false) {
        loseGame()
      }
      else {
        timer -= 1
        timerEl.innerHTML = (timer)
      }
    }, 1000)
  }
  function nextSlide() {
    if (currentSlide === 2) {
      timer = 0
    }
    slides[currentSlide].classList.remove('activeSlide')
    currentSlide += 1
    slides[currentSlide].classList.add('activeSlide')
  }
})