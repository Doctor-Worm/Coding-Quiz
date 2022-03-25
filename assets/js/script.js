var header = document.getElementById("question-header");
var startBtn = document.getElementById("start-btn");
var pEl = document.getElementById("page-text");
var btnGrid = document.getElementById("btn-grid");
var timerBox = document.getElementById("timer-box");
// Label for input element on highscore page
var inputLabel = document.getElementById("input");
// Div for highscore ending page
var highScore = document.getElementById("high-score");
// Dynamically created buttons
var answerBtns = document.querySelectorAll("button");

header.textContent = "Coding Quizaroni";
pEl.textContent = "Answer the questions before the timer runs out! Beware, incorrect answers will penalize your score by 10 seconds.";
startBtn.textContent = "Start Quiz";
inputLabel.classList.add('hide');
var count = 75;
timerBox.innerText = "Time: " + count;



// create variables that are undefinied to be used below
var shuffledQuestions, currentQuestionIndex

// Timer countdown function
var timer = function() {
    console.log(count);
    if(count <= 0) {
        clearInterval(timer);
        if (confirm("Oh no! You're out of time! Click OK to try again.") == true) {
            document.location.reload();
        } else {
            console.log('Time is up!');
        }
    }
        count--;
        timerBox.innerText = "Time: " + count;
        };
        

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

var showQuestion = function(q) {
    header.innerText = q.question;
    // for each answer of a question listed in quiz array, create buttons for them
    q.answers.forEach(answer => {
    var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('button');
        // if the answer is correct, store the data as correct
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        } else { (!answer.correct)
            button.dataset.wrong = !answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        btnGrid.appendChild(button);
})
}

// function to proceed to next question
var nextQuestion = function() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};
// reset the buttons for new answers
var resetState = function() {
    while (btnGrid.firstChild) {
        btnGrid.removeChild(btnGrid.firstChild);
    }
};

var selectAnswer = function(event) {
    console.log(event.target);
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct;
    var wrong = selectedButton.dataset.wrong;
    if (shuffledQuestions.length > currentQuestionIndex + 1 && correct) {
        currentQuestionIndex++
        nextQuestion();
    } else if (shuffledQuestions.length > currentQuestionIndex + 1 && wrong) {
        timerBox.innerHTML = "Time: " + (count -= 10);
        selectedButton.classList.add("wrong");
    } else  {
        showHighscore();
    }
};


// End of quiz function to gather high score and store it into local storage
var showHighscore = function() {
    // clears the confirm box from popping up and keeps page from refreshing
    confirm = function() {};

    clearInterval(myTimer);

    btnGrid.classList.add("hide");
    header.innerText = "You've finished!";
    pEl.classList.remove('hide');
    pEl.innerText = "Your final score is " + count + "!";
    inputLabel.classList.remove('hide');

    // Create input element for user to input their name into.
    var inputEl = document.createElement('input');
    inputEl.classList.add('input');
    inputEl.name = 'input';
    inputEl.type = 'text';
    inputEl.placeholder = 'Your Name';
    inputEl.id = 'input-value';
    highScore.appendChild(inputEl);

    // Create the submit button and append it to highScore div.
    var submit = document.createElement('input');
    submit.classList.add('submit-button');
    submit.type = 'submit';
    submit.textContent = "Submit";
    submit.id = "submit-button";
    highScore.appendChild(submit);
    // Grab value data from input field by listening for click of submit button
    var submitButton = document.getElementById("submit-button");

    var submitScore = function() {
        var nameInput = document.querySelector("input[name='input']").value;
        console.log(nameInput);
        
        // check if input values are empty strings
        if (!nameInput) {
            alert("You need to fill out your name!");
            return false;
        } else {
        // save user name and score
        localStorage.setItem(nameInput, count);

        // function to load score and append it to page
        var loadScores = function (count) {
            var nameInput = document.querySelector("input[name='input']").value;
            var num = document.createElement('h2');
            num.classList = 'h2';
            num.innerHTML = "Congratulations  " + nameInput + "!";
            main.appendChild(num);
            }
         // run the function for local storage
        loadScores();
        }
    }

    submitButton.addEventListener("click", submitScore);
};





// function to start quiz and shuffle through the quiz array
var startQuiz = function() {
    // hide original Start button and page text
    startBtn.classList.add('hide');
    pEl.classList.add('hide');
   // shuffle/sort through questions inside quiz array. Math.random gives us a decimal number, subtracting 0.5 will always randomly give us a positive or negative number for the sort function.
   shuffledQuestions = quiz.sort(() => Math.random() - .5);
   // set index to zero to set first question selected by quiz.sort as first question [0]
   currentQuestionIndex = 0;
   // start timer
   myTimer = setInterval(timer, 1000);
   nextQuestion();
};


startBtn.addEventListener("click", startQuiz);