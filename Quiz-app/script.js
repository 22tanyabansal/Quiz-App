const start_btn= document.querySelector(".start_btn button");
const info_box= document.querySelector(".info_box");
const exit_btn= info_box.querySelector(".buttons .quit");
const continue_btn= info_box.querySelector(".buttons .restart");
const quiz_box= document.querySelector(".quiz_box");
const result_box= document.querySelector(".result_box");
const timercount = quiz_box.querySelector(".timer .timer_sec");
const option_list=document.querySelector(".option_list");
const restart_quiz= result_box.querySelector(".buttons .restart");
const quit_quiz=result_box.querySelector(".buttons .quit");


start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    startTimer(10);
}

var ques_count=0;
var counter;
var timevalue=10;
var userscore=0;
function showQuestions(index){
    const quiz_text=document.querySelector(".quiz_text");
    let quiz_tag = '<span>'+ questions[index].numb+". " + questions[index].question+'</span>';
    let option_tag= '<div class="option">'+questions[index].option[0]+'<span></span></div>'
                    +'<div class="option">'+questions[index].option[1]+'<span></span></div>'
                    +'<div class="option">'+questions[index].option[2]+'<span></span></div>'
                    +'<div class="option">'+questions[index].option[3]+'<span></span></div>';
    quiz_text.innerHTML = quiz_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

function optionSelected(answer) {
    clearInterval(counter);
    let userans = answer.textContent;
    let correctans = questions[ques_count].answer;
    let allOptions = option_list.children.length;
    if (userans == correctans) {
        userscore+=1;
        console.log("userscore")
        answer.classList.add("correct");
        console.log("Answer is correct");
        
    } 
    else {
        answer.classList.add("Incorrect");
        console.log("Answer is Wrong");
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent== correctans) {
                option_list.children[i].setAttribute("class","option correct");
                
            }    
        }
    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");    
    }

    if(ques_count==0){
        previous_btn.style.display="none";
        next_btn.style.display="block";
    }
    else if(ques_count==questions.length-1){
        next_btn.style.display="none";
    }
    else{
        previous_btn.style.display="block";
        next_btn.style.display="block";
    }
}
const previous_btn = document.querySelector(".previous_btn");
previous_btn.onclick = ()=>{
    if(ques_count==0){        
        previous_btn.style.display="none";
        next_btn.style.display="block";
    }
    else{
        ques_count--;
        showQuestions(ques_count);
        previous_btn.style.display="none";  
    }    
}

const next_btn = document.querySelector(".next_btn");
next_btn.onclick = ()=>{
    if(ques_count==questions.length-1){
        next_btn.style.display="none";
    }
    else if(ques_count<questions.length-1)
    {
        ques_count++;
        showQuestions(ques_count);
        clearInterval(counter);
        startTimer(timevalue);
        next_btn.style.display="none";
    }

    else{
        clearInterval(counter);
    }
} 
const submit_btn=quiz_box.querySelector(".submit");
submit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    showResult();
}

function startTimer(time) {
    counter=setInterval(timer,1000);
    function timer(){
        timercount.textContent = time;
        time--;
        if(time < 0){
            clearInterval(counter);
            timercount.textContent = "Over";
            let allOptions = option_list.children.length;
            let correctans = questions[ques_count].answer;
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent== correctans) {
                    option_list.children[i].setAttribute("class","option correct");    
                }    
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");    
            }

            if(ques_count==0){
                previous_btn.style.display="none";
                next_btn.style.display="block";
            }

            else if(ques_count==questions.length-1){
                next_btn.style.display="none";
            }
            else{
                previous_btn.style.display="block";
                next_btn.style.display="block";
            }
        }
    }  
}

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    ques_count=0;
    counter;
    timevalue=10;
    userscore=0;
    showQuestions(ques_count);
    //clearInterval(counter);
    startTimer(timevalue);
    if(ques_count==0){
        previous_btn.style.display="none";
        next_btn.style.display="block";
    }
    else if(ques_count==questions.length-1){
        next_btn.style.display="none";
    }
    else if(ques_count<questions.length-1){
        previous_btn.style.display="block";
        next_btn.style.display="block";
    }
    else{
        clearInterval(counter);
    }
}

quit_quiz.onclick = ()=>{
    window.location.reload();
}


function showResult(){
    const scoretext=result_box.querySelector(".score");
    if(userscore>0){
        let scoreTag='<p>Good! You got only <span>'+ userscore+ '</span> out of <span>' +questions.length+'</span></p>';
        scoretext.innerHTML= scoreTag;
    }

    else{
        let scoreTag='<p>Sorry! You got <span>'+ userscore+ ' </span>out of <span>' +questions.length+'</span></p>';
        scoretext.innerHTML= scoreTag;
    }
}
