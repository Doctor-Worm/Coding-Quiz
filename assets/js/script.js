var header = document.getElementById("question-header");
var startBtn = document.getElementById("start-btn");
var pEl = document.getElementById("page-text");
var btnGrid = document.getElementById("btn-grid");

header.textContent = "Coding Quizaroni";
pEl.textContent = "Answer the questions before the timer runs out! Beware, incorrect answers will penalize your score by 10 seconds.";
startBtn.textContent = "Start Quiz";

// create variables that are undefinied to be used below
var shuffledQuestions, currentQuestionIndex

// Quiz Array
var quiz = [
    {
        question: "What two purposes does a Return statement provide?",
        answers: [
            { text: 'Returns an answer & starts over', correct: false },
            { text: 'Returns a value & ends function execution immediately.', correct: true },
            { text: 'Returns a value & continues funtion.', correct: false },
            { text: 'Returns function to top & returns a value.', correct: false },
        ]
    },
    {
        question: "Inside the git terminal, how do you go back/up one directory level?",
        answers: [
            { text: 'cd', correct: false },
            { text: 'cd /', correct: false },
            { text: 'cd ..', correct: true },
            { text: 'cd -', correct: false },
        ]
    },
    {
        question: "What are Parameters?",
        answers: [
            { text: 'Placeholder variables where their values are defined when the function is called, and are not assigned values with the function itself.', correct: true },
            { text: 'Placeholder variables with values that are previously assigned.', correct: false },
            { text: 'Defined values generated by the function.', correct: false },
            { text: 'Variables created by a seperate function.', correct: false },
        ]
    },
    {
        question: "What is an Argument?",
        answers: [
            { text: 'Values generated by the parameter.', correct: false },
            { text: 'Values generated by the function', correct: false },
            { text: 'Actual value that is passed through the parameter and into the function to be used.', correct: true },
            { text: 'Conflict within the code.', correct: false },
        ]
    },
    {
        question: "What is Event Delegation?",
        answers: [
            { text: 'Offsetting the click event to something that did not trigger it.', correct: false },
            { text: 'Refering the event to a child element, instead of its parent element.', correct: false },
            { text: 'Giving the event to two different elements.', correct: false },
            { text: 'Offsetting the click event to a parent that will always exist, and then checking which child element triggered the event.', correct: true },
        ]
    }
];

var showQuestion = function(question) {
    header.innerText = question.question;
    // for each answer of a question listed in quiz array, create buttons for them
    question.answers.forEach(answer => {
    var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('button');
        // if the answer is correct, store the data as correct
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        btnGrid.appendChild(button);
})
}

// function to proceed to next question
var nextQuestion = function() {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

var selectAnswer = function(event) {
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct;
    checkAnswer(button, button.dataset.correct)
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextQuestion();
    } else {
        showHighscore();
    }
};

var showHighscore = function() {

};

var checkAnswer = function(element, correct) {
    if (correct) {
        nextQuestion();
    } else {
        // subtract 10 seconds from timer
        nextQuestion();
    }
};


var startQuiz = function() {
    // hide original Start button and page text
    startBtn.classList.add('hide');
    pEl.classList.add('hide');
   // shuffle/sort through questions inside quiz array. Math.random gives us a decimal number, subtracting 0.5 will always randomly give us a positive or negative number for the sort function.
   shuffledQuestions = quiz.sort(() => Math.random() - .5);
   // set index to zero to set first question selected by quiz.sort as first question [0]
   currentQuestionIndex = 0;
   nextQuestion();


// on button click start timer at 75 seconds
// when button is clicked
// load h1 as question dynamically and load answer buttons from an array dynamically
// when button is pushed, load next question/answer array
};




// how to know if a button is correct?
// how to know if a button is wrong?
// how to set conditions on a timer?

startBtn.addEventListener("click", startQuiz);