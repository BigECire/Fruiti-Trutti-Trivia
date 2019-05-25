$( document ).ready(function() {
    var trivia = {
        correct: 0,
        wrong: 0,
        answered: 0,
        questions: ["question1", "question2"],
        question1: {
            question: "HI?",
            answers:["1", "2", "3", "4"],
            correctAnswer: "3"
        },
        questionPhase: function() {

            $("#game").empty();

            var div = $("<div>");
            div.addClass("card w-100");

            var Q = $("<h5>")
            Q.text(trivia[trivia.questions[trivia.answered]]["question"])
            div.append(Q)

            var br = $("<div> <br> </div>")
            div.append(br)
            div.append(br)

            for (var i = 0; i < 4; i++){
                var A = $("<h6>")
                A.text(trivia[trivia.questions[trivia.answered]]["answers"][i])
                div.append(A)
                div.append(br)
            }
            $("#game").append(div)
            trivia.answered++
        },
        answerPhase: function(answer) {

        },
        resultsPhase: function() {

        },
        reset: function() {

        }
    }
    trivia.questionPhase()
})