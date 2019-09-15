

// questions array
var questionsArr = [
    {
        question: "What was da Vinci's first name?",
        answerList: [
            "Bob",
            "Matteo",
            "Silvio",
            "Leonardo"],
        answer: 3
        },
    {
        question: "Where was da Vinci born?",
        answerList: [ "Venezia",
                      "Vinci",
                      "Firenza",
                      "Vicenza"],
        answer: 1
    },
    {
        question: "When da Vinci was about 14 years old his family moved to Firenza. Da Vinci became an apprentice to who?",
        answerList: ["Verrocchio",
                     "Giapetto",
                     "Medici",
                     "Fibinocchi"],
        answer: 0 
    },
    {
        question: "Leonardo da Vinci lived during what period?",
        answerList: ["Industrial Revolution",
                     "The Enlightenment",
                     "The Modern Era",
                     "The Renaissance"],
        answer: 3
    },
    {
        question: "Which one of Leonardo da Vinci's works did he not finish?",
        answerList: ["Vitruvian Man",
                     "St. John the Baptist",
                     "The Adoration of the Magi",
                     "Virgin and Child with St. Anne"],
        answer: 2
    },
    {
        question: "What is a alternate title for the Mona Lisa?",
        answerList: ["La Gioconda",
                     "Woman of Peace",
                     "Lady da Vinci",
                     "Enigma"],
        answer: 0
    },
    {
        question: "What work of art did da Vinci not create?",
        answerList: ["Mona Lisa",
                     "The Last Supper",
                     "Virgin of the Rocks",
                     "The Last Judgement"],
        answer: 3
    },
    {
        question: "What Museum is the Mona Lisa located in?",
        answerList: ["Louvre",
                     "Muse d'Orsay",
                     "Uffizi Gallery",
                     "Guggenheim Collection"],
        answer: 4
    },
    {
        question: "What new material did da Vinci experiment with to paint The Last Supper?",
        answerList: ["wet plaster",
                     "oil paint",
                     "dry plaster",
                     "canvas"],
        answer: 2
    },
    {
        question: "Da Vinci was considered which of the following;",
        answerList: ["painter",
                     "engineer",
                     "teenaged mutant ninja turtle",
                     "inventor"],
        answer: 2

        
    }

];

var imgArray = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10"]

var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;

var messages = {
    correct: "You chose wisely!",
    incorrect: "you chose poorly",
    endTime: "You ran out of time!",
    finished: "You've completed your quiz. Let's see the results."
}

$("#start-button").on("click", function () {
    $(this).hide();
    newGame();
});

$("#start-over-button").on("click", function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $("#final-message").empty();
    $("#corret-answers").empty();
    $("#incorrect-answers").empty();
    $("#unanswered").empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $("#message").empty();
    $("#corrected-answer").empty();
    $("#img").empty();
    answered = true;

    $("#current-question").html("question #" + (currentQuestion + 1) + "/" + questionsArr.length);
    $(".question").html('<h2>' + questionsArr[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(questionsArr[currentQuestion].answerList[i]);
        choices.attr({ 'data-index': i });
        choices.addClass('thisChoice');
        $(".answer-list").append(choices);
    }

    countDown();
    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

    function countDown() {
        seconds = 20;
        $("timer").html('<h3>Time Remaining: ' + seconds + '</h3>');
        answered = true;
        time = setInterval(showCountdown, 1000);
    }

    function showCountdown() {
        seconds--;
        $("#timer").html('<h3>Time Remaining: ' + seconds + '</h3>');
        if (seconds < 1) {
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }

    function answerPage() {
        $('#currentQuestion').empty();
        $('.thisChoice').empty(); 
        $('.question').empty();
        var rightAnswerText = questionsArr[currentQuestion].answerList[questionsArr[currentQuestion].answer];
        var rightAnswerIndex = questionsArr[currentQuestion].answer;
        $("#img").html('<img src = "assets/images/' + imgArray[currentQuestion] + '.jpg" width = "400px">');

        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $('#message').html(messages.correct);
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            incorrectAnswer++;
            $('#message').html(messages.incorrect);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else {
            unanswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }

        if (currentQuestion == (questionsArr.length - 1)) {
            setTimeout(scoreboard, 5000)
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 5000);
        }
    }

    function scoreboard() {
        $('#timer').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#img').empty();

        $('#final-message').html(messages.finished);
        $('#correct-answers').html("Correct Answers: " + correctAnswer);
        $('#incorrect-answers').html("Incorrect Answers: " + incorrectAnswer);
        $('#unanswered').html("Unanswered: " + unanswered);
        $('#star-over-button').addClass('reset');
        $('#start-over-button').show();
        $('#start-over-button').html('Start Over?');
    }
