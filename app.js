$( window ).on("load", function() {
// (function() {
  const myQuestions = [
    {
      question: "Who is the strongest?",
      answers: {
        a: "Superman",
        b: "The Terminator",
        c: "Waluigi, obviously"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the best site ever created?",
      answers: {
        a: "SitePoint",
        b: "Simple Steps Code",
        c: "Trick question; they're both the best"
      },
      correctAnswer: "c"
    },
    {
      question: "Where is Waldo really?",
      answers: {
        a: "Antarctica",
        b: "Exploring the Pacific Ocean",
        c: "Sitting in a tree",
        d: "Minding his own business, so stop asking"
      },
      correctAnswer: "d"
    }
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
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

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

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
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

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

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
// // questions & answers
// var questions = [
//   {
//     question: "Which of the following is NOT a stringed instrument?",
//     answers: {
//       a: "Viola",
//       b: "Lute",
//       c: "Harpsichord",
//       d: "Dobro"
//     },
//     correctAnswer: "c"
//   },
//   {
//     question: "How many keys are on a typical piano?",
//     answers: {
//       a: "88",
//       b: "78",
//       c: "112",
//       d: "63"
//     },
//     correctAnswer: "a"
//   },
//   {
//     question: 'Which of these instruments is a "Woodwind"?',
//     answers: {
//       a: "Trombone",
//       b: "French Horn",
//       c: "Trumpet",
//       d: "Saxophone"
//     },
//     correctAnswer: "d"
//   },
//   {
//     question: "Which of the following is lowest?",
//     answers: {
//       a: "Alto",
//       b: "Bass",
//       c: "Soprano",
//       d: "Tenor"
//     },
//     correctAnswer: "b"
//   }
// ];
//
//
// // Storing elements in variables:
// var quizContainer = $("#quiz");
// var resultsContainer = $("#results");
// var submitButton = $('#submit');
//
// // current time function and display
// var myVar = setInterval(myTimer, 1000);
//
// function myTimer () {
//   var d = new Date();
//   var t = d.toLocaleTimeString();
//   $('#curTime').html("<p> Current Time is: " + t + "</p>")
// }
// // time stop
// function myStopFunction() {
//   clearInterval(myVar);
// }
//
// $(".btn-danger").on("click", function() {
//   myStopFunction()
// });
//
// // countdown variables
// var seconds = 20;
// var intervalID;
//
// // game timer functions
// function run() {
//   intervalID = setInterval(decrement, 1000);
// }
//
// function stop() {
//   clearInterval(intervalID);
// }
//
// function decrement() {
//   seconds --;
//   $('#time').html("<h2>Time Remaining: " + seconds + " seconds</h2>");
//   if (seconds === 0) {
//     stop();
//     alert("Sorry, you ran out of time!");
//   }
// }
//
// // start game
//   $('.btn-block').on("click", function() {
//     // start timer
//     run();
//     // display quiz questions
//     function buildQuiz() {
//       var output = [];
//       questions.forEach(
//         (currentQuestion, questionNumber) => {
//           var answers = [];
//           for (letter in currentQuestion.answers) {
//             answers.push(
//               `<label>
//                 <input type="radio" name="question${questionNumber}" value="${letter}">
//                 ${letter} :
//                 ${currentQuestion.answers[letter]}
//                 </label>`
//             );
//           }
//           output.push(
//             `<div class="question"> ${currentQuestion.question} </div>
//             <div class="answers"> ${answers.join('')} </div>`
//           );
//         }
//       );
//       $('#quiz').html(output.join(''));
//     }
//
//     });
//     // display results
//     function showResults() {
//     // gather answer containers from our quiz
//     const answerContainers = quizContainer.querySelectorAll(".answers");
//
//     // keep track of user's answers
//     let numCorrect = 0;
//
//     // for each question...
//     questions.forEach((currentQuestion, questionNumber) => {
//       // find selected answer
//       const answerContainer = answerContainers[questionNumber];
//       const selector = `input[name=question${questionNumber}]:checked`;
//       const userAnswer = (answerContainer.querySelector(selector) || {}).value;
//
//       // if answer is correct
//       if (userAnswer === currentQuestion.correctAnswer) {
//         // add to the number of correct answers
//         numCorrect++;
//
//         // color the answers green
//         answerContainers[questionNumber].style.color = "lightgreen";
//       } else {
//         // if answer is wrong or blank
//         // color the answers red
//         answerContainers[questionNumber].style.color = "red";
//       }
//     });
//
//     // show number of correct answers out of total
//     resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
//   }
// submitButton.addEventListener('click', showResults());
//     // $('#submit').on("click", function showResults() {
//     //   console.log('test');
//     //   const answerContainers = quizContainer.querySelectorAll('.answers');
//     //
//     //   let numCorrect = 0;
//     //
//     //   questions.forEach( (currentQuestion, questionNumber) => {
//     //     const answerContainer = answerContainers[questionNumber];
//     //     const selector = `input[name=question${questionNumber}]:checked`;
//     //     const userAnswer = (answerContainer.querySelector(selector) || {}).value;
//     //
//     //     if(userAnswer === currentQuestion.correctAnswer) {
//     //       numCorrect ++;
//     //       answerContainers[questionNumber].style.color = 'lightgreen';
//     //     } else {
//     //       answerContainers[questionNumber].style.color = 'red';
//     //     }
//     //   });
//     //   resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;
//     // });
//
//
//     // display results on click


// pseudocode:
// Create a countdown timer to reset from 30 every new question
// Create object for questions and answers, 1 will be correct and 3 wrong, when the right answer is clicked "correct" message is displayed for 2 seconds, "wrong" if wrong answer is clicked.
//
//
//
//
//
