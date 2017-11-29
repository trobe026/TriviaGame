$( window ).on("load", function() {

// questions & answers
var questions = [
  {
    question: "Which of the following is NOT a stringed instrument?",
    answers: {
      a: "Viola",
      b: "Lute",
      c: "Harpsichord",
      d: "Dobro"
    },
    correctAnswer: "c"
  },
  {
    question: "How many keys are on a typical piano?",
    answers: {
      a: "88",
      b: "78",
      c: "112",
      d: "63"
    },
    correctAnswer: "a"
  },
  {
    question: 'Which of these instruments is a "Woodwind"?',
    answers: {
      a: "Trombone",
      b: "French Horn",
      c: "Trumpet",
      d: "Saxophone"
    },
    correctAnswer: "d"
  },
  {
    question: "Which of the following is lowest?",
    answers: {
      a: "Alto",
      b: "Bass",
      c: "Soprano",
      d: "Tenor"
    },
    correctAnswer: "b"
  }
];


// Storing elements in variables:
var quizContainer = $("#quiz");
var resultsContainer = $("#results");
var submitButton = $('#submit');

// current time function and display
var myVar = setInterval(myTimer, 1000);

function myTimer () {
  var d = new Date();
  var t = d.toLocaleTimeString();
  $('#curTime').html("<p> Current Time is: " + t + "</p>")
}
// time stop
function myStopFunction() {
  clearInterval(myVar);
}

$(".btn-danger").on("click", function() {
  myStopFunction()
});

// countdown variables
var seconds = 20;
var intervalID;

// game timer functions
function run() {
  intervalID = setInterval(decrement, 1000);
}

function stop() {
  clearInterval(intervalID);
}

function decrement() {
  seconds --;
  $('#time').html("<h2>Time Remaining: " + seconds + " seconds</h2>");
  if (seconds === 0) {
    stop();
    alert("Sorry, you ran out of time!");
  }
}

// start game
  $('.btn-block').on("click", function() {
    // start timer
    run();
    // display quiz questions
    function buildQuiz() {
      var output = [];
      questions.forEach(
        (currentQuestion, questionNumber) => {
          var answers = [];
          for (letter in currentQuestion.answers) {
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
                </label>`
            );
          }
          output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
          );
        }
      );
      $('#quiz').html(output.join(''));
    }
    // display results
    function showResults() {
      console.log('test');
      const answerContainers = quizContainer.querySelectorAll('.answers');

      let numCorrect = 0;

      questions.forEach( (currentQuestion, questionNumber) => {
        var answerContainer = answerContainers[questionNumber];
        var selector = 'input[name=question' + questionNumber + ']:checked';
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestion.correctAnswer) {
          numCorrect ++;
          answerContainers[questionNumber].style.color = 'lightgreen';
        } else {
          answerContainers[questionNumber].style.color = 'red';
        }
      });
      resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;
    }

    buildQuiz();
    // display results on click
    $('#submit').on("click", showResults())

  });

});

// pseudocode:
// Create a countdown timer to reset from 30 every new question
// Create object for questions and answers, 1 will be correct and 3 wrong, when the right answer is clicked "correct" message is displayed for 2 seconds, "wrong" if wrong answer is clicked.
//
//
//
//
//
