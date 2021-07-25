// Variables declared at startup
const quizEl = document.getElementById('quizContent')
const timerEl = document.getElementById('timerContent')
const startButton = document.getElementById('start')
const submitButton = document.getElementById('submitQuiz')
var questionNumber = 0
// This variable will give us our questions for the quiz, it is setup as an array with object literals
const quizSource = [
  {
    question: "What does HTML stand for?",
    answers: {
      a: "Hyper Text Markup Language",
      b: "Hyper Tag Markup Language",
      c: "Hyperlinking Text Marking Language",
      D: "Hyperlinks Text Mark Language"
    },
    correctAnswer: "a"
  },
  {
    question: "What symbol indicates a tag?",
    answers: {
      a: "Curved brackets e.g. {,}",
      b: "Angle brackets e.g.<>",
      c: "Commas e.g. ','",
      D: "Exclamation marks e.g. !"
    },
    correctAnswer: "b"
  },
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
  },
  {
    question: "What is the HTML tag under which one can write the JavaScript code?",
    answers: {
      a: "<javascript>",
      b: "<scripted>",
      c: "<script>",
      D: "<js>"
    },
    correctAnswer: "c"
  },

];
highScore = localStorage.getItem("highScore" )
    if(highScore == null){
      highScore = 0
    }
quizEl.innerHTML = ('<h1 id="startTag"> "Welcome! to start the quiz, press \"Start!\" </h1> <p class = "inQuiz"> "Your high score is ' + highScore + '!" </p> ')
// reset timer and score when page reloads
submitButton.classList.add('invisible')
// Add event listener to start startButton, this will start a function that encloses all of our functions and starts the quiz
startButton.addEventListener('click', function () {
  //  call function to build quiz
  // reset timer and score when page reloads
  let timer = 61
  let score = 0
  let didWin = ''
  buildQuiz()
  // define build quiz function
  function buildQuiz() {
    quizEl.innerHTML = ''
    const output = []
    submitButton.classList.remove('invisible')
    quizSource.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        for (letter in currentQuestion.answers) {

          // add Radio button
          answers.push(
            `<label>
              <input type="radio"  class="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
        //  Join question and answers inside slide div
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // Combine output list to string
    quizEl.innerHTML = output.join('');
  }
  function gameOver() {
    timer = 61
    questionNumber = 0
    timerEl.innerHTML = ""
    quizEl.innerHTML = ""
    startButton.classList.remove('invisible')
    submitButton.classList.add('invisible')
    highScore = addScore()
    quizEl.innerHTML = (' <p class = "inQuiz"> Your high score is ' + highScore + '! </p>')
    timerEl.innerHTML = ('<h1 class = inQuiz> "Game over! Your score is ' + score + '!" </h1>')
  }

  function addScore(){
    highScore = localStorage.getItem("highScore" )
    if(highScore == null){
      highScore = 0
    }
    else if( highScore < score){
      highScore = score
    }
    localStorage.setItem("highScore", highScore)
    return highScore
  }
  function loseGame() {
    timerEl.innerHTML = ('<p class = "inQuiz"> "Wrong answer, try again!" </P> <p class = "inQuiz" class="red"> "-5 Seconds!" </p>')
    timer -= 5
    nextSlide()
    didWin = ''
  }
  function winGame() {
    timerEl.innerHTML = ('<p class = "inQuiz"> "That\'s right!, keep it up!" </P> <p class="green"> "+5 Seconds!" </p>')
    timer += 5
    score += 1
    nextSlide()
    didWin = ''
  }
  submitButton.addEventListener('click', function () {
    var userInput = ''
    radio = document.querySelectorAll('.question' + questionNumber)
    radio.forEach(function (button) {
      if (button.checked) {

        userInput = button.value

        console.log(userInput)
        console.log(quizSource[questionNumber].correctAnswer)
      }
      if (userInput === quizSource[questionNumber].correctAnswer) {
        didWin = true
      }
      else {
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
        didWin = ''
        winGame()
      }
      else if (didWin === false) {
        didWin = ''
        loseGame()
      }
      else {
        timer -= 1
        timerEl.innerHTML = (timer)
      }
    }, 1000)
  }

  function nextSlide() {
    if (currentSlide <= 4) {
      slides[currentSlide].classList.remove('activeSlide')
      currentSlide += 1
      slides[currentSlide].classList.add('activeSlide')
      questionNumber += 1
    }
    else {
      timer = 0
    }
  }

})