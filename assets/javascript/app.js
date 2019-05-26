$( document ).ready(function() {
    var intervalId;
    var trivia = {
        qPhase: true,
        time: 0,
        correct: 0,
        wrong: 0,
        answered: 0,
        theCorrectAnswer: "",
        questions: ["question1", "question2", "question3"],
        question1: {
            question: "HI?",
            answers:["1", "2", "3", "4"],
            correctAnswer: "3"
        },
        question2: {
            question: "H?",
            answers:["11", "22", "33", "44"],
            correctAnswer: "22"
        },
        question3: {
            question: "H3?",
            answers:["111", "222", "333", "444"],
            correctAnswer: "111"
        },
        count: function() {

            trivia.time--;
            console.log(trivia.time);
          
            $(".clock").text("Time Remaining: " + trivia.time + " Seconds");
            if(trivia.time === 0){
                if(trivia.qPhase){
                    console.log(trivia[trivia.questions[trivia.answered]]["correctAnswer"]);
                    clearInterval(intervalId);
                    trivia.qPhase = false
                    trivia.answerPhase("")
                }
                else{
                    console.log("hi")
                    clearInterval(intervalId);
                    trivia.qPhase = true
                    if(trivia.answered !== trivia.questions.length){
                    trivia.questionPhase()
                }
                else{
                    trivia.resultsPhase()
                }
                }


            }
        },
        questionPhase: function() {

            $("#game").empty();

            var div = $("<div>");
            div.addClass("card w-100");

            var Q = $("<h6>")
            Q.text(trivia[trivia.questions[trivia.answered]]["question"])
            div.append(Q)

            var br = $("<div> <br> </div>")
            div.append(br)
            div.append(br)

            for (var i = 0; i < 4; i++){
                var A = $("<h5>")
                A.text(trivia[trivia.questions[trivia.answered]]["answers"][i])
                A.addClass("Answer A" + (i + 1))
                A.attr("value", trivia[trivia.questions[trivia.answered]]["answers"][i])
                div.append(A)
                div.append(br)
            }
            $("#game").append(div)

            trivia.theCorrectAnswer = trivia[trivia.questions[trivia.answered]]["correctAnswer"]
            trivia.time = 10
            $(".clock").text("Time Remaining: " + trivia.time + " Seconds");
            intervalId = setInterval(trivia.count, 1000);

            $('.container').on("click",".Answer", function(){
                if(trivia.qPhase){
                clearInterval(intervalId);
                trivia.qPhase = false
                trivia.answerPhase($(this).attr('value'))
            }
            })

            
        },
        answerPhase: function(answer) {
            if(answer === trivia[trivia.questions[trivia.answered]]["correctAnswer"]){
                $("#game").empty();
                var div = $("<div>");
                div.addClass("card w-100");

                var C = $("<h3>")
                C.text("Congratulations!")
                div.append(C)

                var Y = $("<h5>")
                Y.text("You were right!")
                div.append(Y)

                $("#game").append(div)
            }
            else{
               $(".A" + (1 + trivia[trivia.questions[trivia.answered]]["answers"].indexOf(trivia[trivia.questions[trivia.answered]]["correctAnswer"]))).attr("style", "background-color: green;")
            }
            trivia.time = 3
            $(".clock").text("Time Remaining: " + trivia.time + " Seconds");
            trivia.answered++
            intervalId = setInterval(trivia.count, 1000);
        },
        resultsPhase: function() {
            $("#game").empty();

            var div = $("<div>");
            div.addClass("card w-100");

            var C = $("<h3>")
            C.text("Your Score")
            div.append(C)

            var Y = $("<h5>")
            Y.text("Correct: ")
            div.append(Y)

            var Y = $("<h5>")
            Y.text("Wrong: ")
            div.append(Y)

            var C = $("<h4>")
            C.text("Would you like to play agian?")
            div.append(C)

            var btn = $("<button>")
            btn.text("Replay")
            div.append(btn)

            $("#game").append(div)

            $('.container').on("click","button", function(){
                trivia.reset()
            })
        },
        reset: function() {

        }
    }
    trivia.questionPhase()
})
// question: {
//     question: "",
//     answers:["", "", "", ""],
//     correctAnswer: ""
// },