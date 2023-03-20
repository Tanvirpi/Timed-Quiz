const startButton = document.getElementById('start-btn')

const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question-element')
const answerButtonElement = document.getElementById('answer-buttons')
const timerEL = document.getElementById('timer')
const summaryEl = document.getElementById("summary")
summaryEl.classList.add("hide")
console.log(answerButtonElement)
var timerObj;
var timerCounter = 20;
var scoreCount = 0;
var btn1 = document.getElementById('btn-1')
var btn2 = document.getElementById('btn-2')
var btn3 = document.getElementById('btn-3')
var btn4 = document.getElementById('btn-4')
btn1.addEventListener("click",setStatusClass)
btn2.addEventListener("click",setStatusClass)
btn3.addEventListener("click",setStatusClass)
btn4.addEventListener("click",setStatusClass)
const result = document.getElementById("result")
const score = document.getElementById("score")

startButton.addEventListener('click',startQuiz)

function startQuiz() {
    console.log('Started')
    startButton.classList.add('hide')
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide')
    setNextQuestion()
    setInterval(function(){
        timerEL.innerText = timerCounter;
        if(timerCounter > 0){
            timerCounter--
        }else{
            endQuizGame()
        }
    },1000)
}

function setNextQuestion() {
  //  resetState()
    showQuestion(questions[currentQuestionIndex])

}

function showQuestion (question) {
    questionElement.innerText = question.question
    btn1.innerText= question.answers[0].text
    btn1.setAttribute("data-value",question.answers[0].correct)
    btn2.innerText= question.answers[1].text
    btn2.setAttribute("data-value",question.answers[1].correct)
    btn3.innerText= question.answers[2].text
    btn3.setAttribute("data-value",question.answers[2].correct)
    btn4.innerText= question.answers[3].text
    btn4.setAttribute("data-value",question.answers[3].correct)

}

function setStatusClass(){
    var buttonPress = this.getAttribute("data-value")
    // clearStatusClass(element)
    if (buttonPress== "true") {
        result.innerText = "Good Job"
        scoreCount+=10
    } else {
        result.innerText = "Ooops"
        timerCounter -=5;
        }
        score.innerText= "Current Score: "+scoreCount
        if(currentQuestionIndex<questions.length-1){
            currentQuestionIndex++;
            setNextQuestion(questions[currentQuestionIndex])
        }
        else {
            endQuizGame()
        }
    
    
}

const questions = [
    {
        question: 'Capitol of Colorado?',
        answers: [
        { text: 'Boulder', correct:false},
        { text: "Denver", correct:true},
        { text: 'Springs', correct:false},
        { text: "Golden", correct:false},

        ]
    },
    {
        question: '2+2?',
        answers: [
        { text: '2', correct:false},
        { text: "4", correct:true},
        { text: '3', correct:false},
        { text: "5", correct:false},

        ]
    },
    {
        question: 'Which planet has the most moons?',
        answers: [
        { text: 'Mars', correct:false},
        { text: "Neptune", correct:false},
        { text: 'Earth', correct:false},
        { text: "Saturn", correct:true},

        ]
    },

    {
        question: 'What country drinks the most coffee per capita?',
        answers: [
        { text: 'Finland', correct:true},
        { text: "US", correct:false},
        { text: 'Russia', correct:false},
        { text: "China", correct:false},

        ]
    },
    {
        question: 'How many faces does a Dodecahedron have?',
        answers: [
        { text: '10', correct:false},
        { text: "11", correct:false},
        { text: '12', correct:true},
        { text: "14", correct:false},

        ]
    }
]



function endQuizGame(){
    clearInterval(timerObj)
    questionContainer.classList.add('hide')
    document.getElementById('final-score').classList.remove("hide")
    document.getElementById("finalscore").innerText= "Your final score is = "+ (scoreCount+timerCounter)
}

document.getElementById("save-user").addEventListener("click", function (){
        var user= document.getElementById("inputtag").value
        var savesScore = JSON.parse(localStorage.getItem("codequiz")) || []
        savesScore.push({
            user:user,
            score:scoreCount+timerCounter
        })
        localStorage.setItem("quiz", JSON.stringify(savesScore))
        var html =""
        document.getElementById('final-score').classList.add("hide")
        summaryEl.classList.remove("hide")
        for(let i = 0;i<savesScore.length;i++){
            html += `<h3>${savesScore[i].user} ---- <span>${savesScore[i].score}</span></h3> `
        }
        document.getElementById('list').innerHTML = html
        timerCounter = 20;
        scoreCount = 0
})