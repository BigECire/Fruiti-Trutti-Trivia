$( document ).ready(function() {
    var intervalId;
    var trivia = {
        qPhase: true,
        time: 0,
        correct: 0,
        wrong: 0,
        answered: 0,
        theCorrectAnswer: "",
        submitedAnswer:"",
        questions: ["question1", "question2", "question3", "question4", "question5", "question6", "question7"],
        question1: {
            question: "Which one of these is not a berry?",
            answers:["Avocados", "Bananas", "Strawberries", "Watermelon"],
            correctAnswer: "Strawberries"
        },
        question2: {
            question: "Which one of these are not a member of the rose family?",
            answers:["Apples", "Peaches", "Raspberries", "Lemon"],
            correctAnswer: "Lemon"
        },
        question3: {
            question: "What is the world's most popular fruit?",
            answers:["Tomatos", "Apples", "Bananas", "Grapes"],
            correctAnswer: "Tomatos"
        },
        question4: {
            question: "__________ is the study of fruits.",
            answers:["Olericulture", "Pomology", "Oenology", "Floriculture"],
            correctAnswer: "Pomology"
        },
        question5: {
            question: "There is a tree called ____________ that sprouts 3 to 7 different fruits in the same tree.",
            answers:["Wonderland Tree", "Chimera tree", "Fruit Salad Tree", "Cornucopia Tree"],
            correctAnswer: "Fruit Salad Tree"
        },
        question6: {
            question: "Orangutans love what fruit the most!",
            answers:["Star fruits", "Bananas", "Mangos", "Oranges"],
            correctAnswer: "Mangos"
        },
        question7: {
            question: "A ______ is not a fruit, it is a herb!",
            answers:["Advocado", "Banana", "Pear", "Cerry"],
            correctAnswer: "Banana"
        },
        question7: {
            question: "An apple tree can produce up to 400 apples a year",
            answers:["Advocado", "Banana", "400", "Cerry"],
            correctAnswer: "400"
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
            div.addClass("card card-change w-100");

            var Q = $("<h4>")
            Q.text(trivia[trivia.questions[trivia.answered]]["question"])
            div.append(Q)

            for (var i = 0; i < 4; i++){
                var A = $("<h5>")
                A.text(trivia[trivia.questions[trivia.answered]]["answers"][i])
                A.addClass("Answer A" + (i + 1))
                A.attr("value", trivia[trivia.questions[trivia.answered]]["answers"][i])
                div.append(A)
            }
            $("#game").append(div)

            trivia.theCorrectAnswer = trivia[trivia.questions[trivia.answered]]["correctAnswer"]
            trivia.time = 20
            $(".clock").text("Time Remaining: " + trivia.time + " Seconds");
            intervalId = setInterval(trivia.count, 1000);

            $('.container').on("click",".Answer", function(){
                if(trivia.qPhase){
                clearInterval(intervalId);
                trivia.submitedAnswer = $(this).attr('value')
                console.log(trivia.submitedAnswer)
                trivia.qPhase = false
                trivia.answerPhase($(this).attr('value'))
            }
            })

            
        },
        answerPhase: function(answer) {
            if(answer === trivia[trivia.questions[trivia.answered]]["correctAnswer"]){
                $("#game").empty();
                var div = $("<div>");
                div.addClass("card card-change w-100");

                var C = $("<h3>")
                C.text("Congratulations!")
                div.append(C)

                var Y = $("<h5>")
                Y.text("You were right!")
                div.append(Y)

                $("#game").append(div)
                trivia.correct++
            }
            else{
               $(".A" + (1 + trivia[trivia.questions[trivia.answered]]["answers"].indexOf(trivia[trivia.questions[trivia.answered]]["correctAnswer"]))).attr("style", "background-color: green;")
               $(".A" + (1 + trivia[trivia.questions[trivia.answered]]["answers"].indexOf(trivia.submitedAnswer))).attr("style", "background-color: red;")
               trivia.wrong++
            }
            trivia.submitedAnswer = ""
            trivia.time = 3
            $(".clock").text("Time Remaining: " + trivia.time + " Seconds");
            trivia.answered++
            intervalId = setInterval(trivia.count, 1000);
        },
        resultsPhase: function() {
            $("#game").empty();

            var div = $("<div>");
            div.addClass("card card-change w-100");

            var C = $("<h3>")
            C.text("Your Score")
            div.append(C)

            var Y = $("<h5>")
            Y.text("Correct: " + trivia.correct)
            div.append(Y)

            var Y = $("<h5>")
            Y.text("Wrong: " + trivia.wrong)
            div.append(Y)

            var C = $("<h4>")
            C.text("Would you like to play again?")
            div.append(C)

            var btn = $("<button>")
            btn.addClass("btn btn-info")
            btn.text("Replay")
            div.append(btn)

            $("#game").append(div)
            $(".clock").text("Thanks for playing!");

            $('.container').on("click","button", function(){
                trivia.reset()
            })
        },
        reset: function() {
            trivia.qPhase = true
            trivia.correct = 0
            trivia.wrong = 0
            trivia.answered = 0
            clearInterval(intervalId);
            trivia.questionPhase()
        }
    }
    trivia.questionPhase()
})
