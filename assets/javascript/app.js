$( document ).ready(function() {
    var intervalId;
    var trivia = {
        qPhase: true,
        time: 0,
        correct: 0,
        wrong: 0,
        answered: 0,
        theCorrectAnswer: "",
        questions: ["question1", "question2"],
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
                    trivia.questionPhase()
                }


            }
        },
        questionPhase: function() {

            $("#game").empty();

            var div = $("<div>");
            div.addClass("card w-100");

            // var clock = $("<h6>")
            // clock.addClass("clock")
            // clock.text("Time Remaining: " + trivia.time + " Seconds")
            // div.append(clock)

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
                clearInterval(intervalId);
                trivia.qPhase = false
                trivia.answerPhase($(this).attr('value'))
            })

            
        },
        answerPhase: function(answer) {
            if(answer === trivia[trivia.questions[trivia.answered]]["correctAnswer"]){
                $("#game").empty();
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