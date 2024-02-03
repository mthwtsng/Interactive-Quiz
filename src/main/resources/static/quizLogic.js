const quizData = [
    {
        question: "What is the capital of France?", 
        answers: ["Paris", "Berlin", "Rome", "Madrid"],
        correctAnswer: "Paris",
        selected: ""
    },
    {
        question: "What is the capital city of Australia",
        answers:["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: "Canberra",
        selected: ""
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean",
        selected: ""
    },
    {
        question: "Who was the first President of the United States?",
        answers: ["Thomas Jefferson", "George Washington", "John Adams", "James Madison"],
        correctAnswer: "George Washington",
        selected: ""
    },
];

var currentIndex = 0;
var userScore = 0;
const currentQuestion = document.getElementById("question");
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button")
const submitButton = document.getElementById("submit-button")
const answerList = document.getElementById("answer-list")
const userScoreElement = document.getElementById("user-score")
const correctAnswersList = document.getElementById("correct-answers")
const resultSection = document.getElementById("result-section")

// Loads new question into question-section placeholder
function loadQuestion(){
    currentQuestion.textContent = quizData[currentIndex].question
    answerList.innerHTML = ""
    quizData[currentIndex].answers.forEach(function(answer,index){
        var newAnswer = document.createElement("li")
        var isChecked = quizData[currentIndex].selected === answer ? "checked" : "";
        newAnswer.innerHTML = `<input type="radio" name="answer" value="${answer}" ${isChecked}> ${answer}`;
        answerList.append(newAnswer)
    });
    if(currentIndex === quizData.length - 1){
        nextButton.disabled = true
        nextButton.style.visibility = "hidden"
    }
    else{
        nextButton.disabled = false
        nextButton.style.visibility = "visible"
    }
    if(currentIndex === 0){
        previousButton.disabled = true
        previousButton.style.visibility = "hidden"
    }
    else{
        previousButton.disabled = false
        previousButton.style.visibility = "visible"
    }
}


// Saves selected answer for when return to already answered questions
function updateSelectedAnswer(){
    const selectedRadio = document.querySelector('input[name = answer]:checked')
    if(selectedRadio){
    quizData[currentIndex].selected = selectedRadio.value }
}

// Updates index+1 and loads question of index
function nextQuestion(){
    if(currentIndex < quizData.length - 1){
        updateSelectedAnswer()
        currentIndex++
        loadQuestion()
    }
    
}

// Updates index-1 and loads question of index
function previousQuestion(){
    if(currentIndex > 0){
        updateSelectedAnswer()
        currentIndex--
        loadQuestion()
    }
}

// Appends answer to result section placeholder and displays all correct answers
function displayResults() {
    userScoreElement.textContent = userScore;
    quizData.forEach((question, index) => {
        const listItem = document.createElement("li")
        listItem.textContent = `Question ${index + 1}: ${question.correctAnswer}`
        correctAnswersList.appendChild(listItem)
    });
    resultSection.style.display = "block"
}

// Adds all correct answers and displays answer
function submitFunction(){
    updateSelectedAnswer()
    let totalScore = 0;
    for(var i = 0; i < quizData.length; i++){
        if(quizData[i].correctAnswer === quizData[i].selected){
            totalScore++
        }
    }
    userScore = totalScore
    console.log(totalScore)
    displayResults()
    submitButton.disabled = true
    submitButton.style.visibility = "hidden"
}

// Button event listeners and loads first question
nextButton.addEventListener("click", nextQuestion)
previousButton.addEventListener("click", previousQuestion)
submitButton.addEventListener("click", submitFunction)
loadQuestion();



