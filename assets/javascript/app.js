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

// display quiz questions
  function buildQuiz() {
    var output = [];

    questions.forEach((currentQuestion, questionNumber) => {
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
      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });
    $('#quiz').html(output.join(""));
  }
  buildQuiz();
  // hide until start button click
  $('#quiz').hide();

  // next slide on correct answer click
  $('label').on('click', function () {
    console.log('test');
    questions.forEach((currentQuestion, questionNumber) => {
      var answerContainers = quizContainer.querySelectorAll(".answers");
      var answerContainer = answerContainers[questionNumber];
      var selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        seconds = 20;
        // $('#quiz').text('Correct!');
        console.log('test2');

        $('#quiz').show();
        showNextSlide();
      } else {


      }
      // if (userAnswer !== currentQuestion.correctAnswer) {
      //   $('#quiz').html(`<h2>Wrong Answer! The Correct Answer was: ${currentQuestion.correctAnswer} </h2>`);
      // }
    });
  });

// display results

  function showResults() {
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    questions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      var answerContainer = answerContainers[questionNumber];
      var selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    $('#results').html(`${numCorrect} out of ${questions.length}`);
  }

// slides

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

// Stored elements:
  var quizContainer = $("#quiz")[0];
  var resultsContainer = $("#results")[0];
  var submitButton = $("#submit")[0];
  var previousButton = $("#previous")[0];
  var nextButton = $("#next")[0];
  var slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  $('#submit').on('click', showResults);
  $('#previous').on('click', showPreviousSlide);
  $('#next').on('click', showNextSlide);


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
    stop()
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

   function correct() {
     $('#quiz').text('Correct!');
   }

   function run() {
      intervalID = setInterval(decrement, 1000);
    }

// start game

  $('.btn-block').on("click", function() {
    // start timer
    run();
    $('#quiz').show();

    });

 });
