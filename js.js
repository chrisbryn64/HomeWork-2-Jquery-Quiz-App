//Created with help from the internet.


var questions = [{
    question: "What is squirtle's color in Pokemon Fire Red version?",
    choices: ["Blue", "Green", "Orange", "Yellow"],
    correctAnswer: 1
}, {
    question: "What is Volt Tackle's base power?",
    choices: ["100", "120", "90", "98"],
    correctAnswer: 2
}, {
    question: "What is the first pokemon that Ash saw on his first day as a trainer?",
    choices: ["Spearow", "Ho-Oh", "Rattata", "Pidgy"],
    correctAnswer: 1
}, {
    question: "What is the first pokemon?",
    choices: ["Mew", "Arceus", "Bulbasaur", "Rhyhorn"],
    correctAnswer: 0
}, {
    question: "Who is the guy Misty is with at Cerulean Cape?",
    choices: ["Tracy", "Bill", "Gary", "Brock"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Show the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // click next then show the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Pokemon Masters don't run away.");
                $(document).find(".quizMessage").show();
            } else {
                // not sure if this code is correct
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // caz we displayed the first question on the DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                   
                    // ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over. show Play Again
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// show current question and the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set to the current question
    $(questionClass).text(question);

    // Remove all current list elements if there are any
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}