const quizEl = document.getElementById('quizContent')
const timerEl = document.getElementById('timerContent')
const startButton = document.getElementById('start')

let timer = 11

document.getElementById('start').addEventListener('click', startTimer) 

function startTimer(){
    startButton.classList.add('invisible')
    var set = setInterval(function () {
        buildQuiz()
        didWin = checkWin()
        if (timer === 0) {
            clearInterval(set)
            gameOver()
        }
        else if (didWin === true) {
            winGame()
        }
        else if (didWin === false) {
            clearInterval(set)
            loseGame()
        }
        else{
            timer -= 1
            timerEl.innerHTML = (timer)
        }
    }, 1000)
}
function buildQuiz() {
}
function gameOver() {
    alert('GAME OVER')
    timer = 11
    timerEl.innerHTML = ""
    startButton.classList.remove('invisible')
}
function loseGame() {
    alert('wrong answer')
    timer -= 5
    timerEl.innerHTML = ""
}
function winGame() {
    alert('YOU WON!')
    timer += 5
    timerEl.innerHTML = ""
}
function checkWin(){
    var didWin = false
    return didWin
}