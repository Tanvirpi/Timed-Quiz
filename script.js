const startButton = document.getElementById('start-btn')

const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question-element')
const answerButtonElement = document.getElementById('answer-buttons')
const timerEL = document.getElementById('timer')
console.log(answerButtonElement)
var timerObj;
var timerCounter = 45;
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
    // question.answers.forEach(answer => {
    //     const button = document.createElement('button')
    //     button.innerText = answer.text
    //     button.classList.add('btn')
    //     if (answer.correct){
    //         button.dataset.correct = answer.correct
    //     }
    //     button.addEventListener('click', selectAnswer)
    //     answerButtonElement.appendChild(button)
    //     questionContainer.classList.remove('hide')
    // }

    // )


}

// function resetState (){
//     nextButton.classList.add('hide')
//     while (answerButtonElement.firstChild){
//         answerButtonElement.removeChild
//         (answerButtonElement.firstChild)
//     }

// }


// function selectAnswer(e) {
//     const selectButton = e.target
//     const correct = selectButton.dataset.correct
//     setStatusClass(document.body, correct)
//     Array.from(answerButtonElement.children).forEach(button => {
//         setStatusClass(button, button.dataset.correct)
//     }
//         )

// }

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
        question: '5*2?',
        answers: [
        { text: '6', correct:false},
        { text: "10", correct:true},
        { text: '7', correct:false},
        { text: "8", correct:false},

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
        localStorage.setItem("quiz", JSON.stringify({user:user,score:(scoreCount+timerCounter)}))

})