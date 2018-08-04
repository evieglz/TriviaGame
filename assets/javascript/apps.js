// Trivia Game
// create a var for  questions/ name/ and correct answers

var questionArr = ["#question1","#question2","#question3","#question4", "#question5","#question6","#question7","#question8","#question9","#question10","#question11","#question12","#question13","#question14","#question15"];
var questionName = ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15",];
var correctAnswers = ["all belong to the category of cartilaginous fish","a mako shark","a whale shark","there are over 440 species","they do not have bony skeletons.","no, they are a species of fish","Epaulette sharks","Dwarf Lantern-shark","rays","Greenland sharks","great white shark","Bull sharks","because they have eyelids","no, sharks can only swim forwards","Sight, smell, touch, taste, hearing, and electroreception."];

var startTimer;
var questionCount= 0;
var time = 30;
var answer;
var correct = 0;
var incorrect = 0;

// var correctAnswers = "";

// new game function starts a new game
function newGame(){
    // hide all of the questions;
    hideQuestions();
    // create an if and else statement for game over
    if(!$("#gameOver").hasClass("hidden")){
        $("#gameOver").addclass("hidden");
    }
// create an if statement for score
    if(!$("#score").hasClass("hidden")){
        $("#score").addClass("hidden");
    }
    // create an if statement for shark-quiz/
    if(!$("#shark-quiz").hasClass("hidden")){
        $("#shark-quiz").addClass("hidden");
    }
    // set all the radio buttons to unchecked
    $("input[type=radio]").prop("checked",false);

    // reset the question counter
    questionCount = 0;

    // reset the number of correct and incorrect ot 0

    correct= 0;
    incorrect = 0;

    // reset the timer
    time= 30;

    // display the first question on the question array
    $(questionArr[0]).show();

    // initiate the set interval function (called game)
    game();

}

// reset timer
function newTimer(){
	time = 30;
    console.log(time);
}

// hides the questions 
function hideQuestions(){    
    $(".questions").hide();    
}

// function set for 1 second intervals
function game() { startTimer = setInterval(function(){

        // 
    time--;
    // create if and else statements
    if (time>=0 && time<31){
        console.log(time);
        // display the time digits
        $("#digits").html(time);

    }else if (time===-1){
        // if time runs out....
        console.log ("times up!");
        // hide the question:
        $(questionArr[questionCount]).hide();
        $("#incorrect").removeClass("hidden");

        $("#correctanswer").html(correctAnswers[questionCount]);
        
        incorrect++;

        questionCount++;
        console.log("You have finished " + questionCount + " out of " + questionArr.length +" questions");


        // display Time's Up
    		$("#timeup").removeClass("hidden");

        // restart timer after 3 seconds by calling newTimer function
    		setTimeout(function(){ 
        //reset the timer before the next question
    		newTimer();
        // show next question  
         $(questionArr[questionCount]).show();
    	//re-hide Time's Up message
    	$("#timeup").addClass("hidden");
        //re-hide incorrect div 
        $("#incorrect").addClass("hidden");
    		}, 3000);
    } else if (questionCount===questionArr.length){
        // if the timer runs out on the last question...
        console.log("Game Over");
        // display Game Over message 
        $("#gameOver").removeClass("hidden");
        // stop the timer 
        stopTimer();
        return;
    }
    // user guesses and information goes here
    answer = $("input[type=radio][name=" + questionName[questionCount] + "]:checked").val();

    if (answer === "correct"){
        console.log("The answer is correct");
        // increase correct answers total 
        correct++;

     // hide the question
     $(questionArr[questionCount]).hide();

    // increase questionCount by 1
    questionCount++;

    console.log("You have finished " + questionCount + " out of " + questionArr.length +" questions")
    console.log("Correct:" + correct);
    console.log("Incorrect:" + incorrect);

    // display Time's Up
    $("#correct").removeClass("hidden");

// newTimer();
    setTimeout(function(){ 
    // show next question    
    $(questionArr[questionCount]).show();
    //reset the timer before the next question
    newTimer();
    //re-hide Time's Up message
    $("#correct").addClass("hidden");                
    }, 2000);

} else if (answer === "incorrect"){
    console.log("The answer is incorrect");
    //increase incorrect answers total
    incorrect++;

    // hide the question
    $(questionArr[questionCount]).hide();

    $("#correctanswer").html(correctAnswers[questionCount]);

     // increase questionCount by 1
     questionCount++;
     console.log("You have finished " + questionCount + " out of " + questionArr.length +" questions")

     console.log("Correct:" + correct);
     console.log("Incorrect:" + incorrect);

     // display message "Wrong!"
     $("#incorrect").removeClass("hidden");

     // newTimer();
     setTimeout(function(){ 
                
        // show next question    
        $(questionArr[questionCount]).show();

        //reset the timer before the next question
        newTimer();

        //re-hide "Wrong!" message
        $("#incorrect").addClass("hidden");
        
    }, 2000);

} else if (correct + incorrect === questionArr.length){
    // if 10 questions have been answered 
    console.log("Game Over");
    // display Game Over message 

    setTimeout(function(){ 
        $("#gameOver").removeClass("hidden");
        $("#score").removeClass("hidden");
        $("#numberCorrect").html(correct);
        // stop the timer 
        stopTimer();
        return;
    }, 3000);

    }   
 
}, 1000);  


}

function stopTimer(){
    // stop the timer
    clearInterval(startTimer);
}
// invoke the hideQuestions function 
hideQuestions();

// Start Button stops the timer if it is running and starts a new game
$("#start").on("click", function(){
    stopTimer();    
    newGame();
})


