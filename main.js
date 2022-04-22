
const main = async () => {
    //get Jeopardy data from jeopardy.json
    const httpResponse = await fetch("jeopardy.json");
    const data = await httpResponse.json();
    console.log(data);

    //query select using jquery
    const score = $("#score");
    const one = $("#one");
    const two = $("#two");
    const four = $("#four");
    const six = $("#six");
    const eight = $("#eight");
    const question = $("#question");
    const form = $("#form");
    const answer = $("#answer");
    const submit = $("#submit");

    let randomQuestion; //Creates a global variable
    let questionValue = 0;
    let isClicked = false;
    
    //Score
    let scoreTotal = localStorage.getItem("scoreTotal");
    if (scoreTotal === null) {
        scoreTotal = 0;
        // .text is jquery for .innertext
        score.text(`Score: $ ${scoreTotal}`);
    } else {
        score.text(`Score: $ ${scoreTotal}`);
    }
    //Function to generate random question "value" must be in () to access data
    const randomQuestionGen = (value) => {
        randomQuestion = data[Math.ceil(Math.random() * data.length -1)];
        while (randomQuestion.value !== value) {
            randomQuestion = data[Math.ceil(Math.random() * data.length -1)];
        }
        console.log(randomQuestion);
        question.text(`Question: ${randomQuestion.question}?`);
        return randomQuestion;
    }

    //jQuery event listeners $100, $200, $400, $600 and $800
    one.on("click", (e) => {
        if (isClicked === false) {
            if ($(e.target).hasClass("disable")) {
            
            } else {
                randomQuestionGen("$100");
                $(e.target).text("");
                $(e.target).addClass("disable");
                questionValue = 100;
                isClicked = true;
                submit.prop("disabled", false);
            }
        }
        
    });

    two.on("click", (e) => {
        if (isClicked === false) {
            if ($(e.target).hasClass("disable")) {
            
            } else {
                randomQuestionGen("$200");
                $(e.target).text("");
                $(e.target).addClass("disable");
                questionValue = 200;
                isClicked = true;
                submit.prop("disabled", false);
            }
        }
    });

    four.on("click", (e) => {
        if (isClicked === false) {
            if ($(e.target).hasClass("disable")) {
            
            } else {
                randomQuestionGen("$400");
                $(e.target).text("");
                $(e.target).addClass("disable");
                questionValue = 400;
                isClicked = true;
                submit.prop("disabled", false);
            }
        }
    });

    six.on("click", (e) => {
        if (isClicked === false) {
            if ($(e.target).hasClass("disable")) {
            
            } else {
                randomQuestionGen("$600");
                $(e.target).text("");
                $(e.target).addClass("disable");
                questionValue = 600;
                isClicked = true;
                submit.prop("disabled", false);
            }
        }
    });

    eight.on("click", (e) => {
        if (isClicked === false) {
            if ($(e.target).hasClass("disable")) {
            
            } else {
                randomQuestionGen("$800");
                $(e.target).text("");
                $(e.target).addClass("disable");
                questionValue = 800;
                isClicked = true;
                submit.prop("disabled", false);
            }
        }
    });

    //submit button
    form.on("submit", (e) => {
        e.preventDefault();
        console.log(answer.value);

        // if (answer.value === undefined) {
        //     question.text("Please enter an answer");
        // } else if (answer.value === "") {
        //     question.text("Please enter an answer");
        // }

        //if correct
        const correctAnswer = () => {
            scoreTotal = Number(scoreTotal) + Number(questionValue);

            score.text(`Your score is : $ ${scoreTotal}`);
            question.text("Correct!");
            answer.val("");
            localStorage.setItem("scoreTotal", scoreTotal);
            isClicked = false;
            submit.prop("disabled", true);
        }

        const wrongAnswer = () => {
            scoreTotal = Number(scoreTotal)
            score.text(`Your score is : $ ${scoreTotal}`);
            question.text(`Wrong! The correct answer is: ${randomQuestion.answer}`);
            answer.val("");
            localStorage.setItem("scoreTotal", scoreTotal);
            isClicked = false;
            submit.prop("disabled", true);
        };

        if (answer.val().toString() === randomQuestion.answer.toString()) {
            correctAnswer();
        } else {
            console.log(answer.value);
            if (answer.val().toString() === undefined) {
                question.text(`Question: ${randomQuestion.question}? ...Please enter an answer!`);
                submit.prop("disabled", false);
              } else if (answer.val().toString() === "") {
                question.text(`Question: ${randomQuestion.question}? ...Please enter an answer!`);
                submit.prop("disabled", false);
              } else {
                wrongAnswer();
            }
        }
    });
};

main();