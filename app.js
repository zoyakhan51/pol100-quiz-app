
class Question{
    //question = string, answer = string, options = array of strings, data id num = to help identify buttons/options
    constructor(question, answer, options, topic, iscorrect){
        this.question = question;
        this.answer = answer;
        this.options = options;
        this.topic = topic;
        this.iscorrect = iscorrect;
    }

    print_test_question(){          //only for testing purposes
        console.log("question: "+ this.question)
        console.log("answer: "+ this.answer)
        console.log("options: "+ this.options)
        console.log("topic: "+ this.topic)
        console.log("iscorrect: "+ this.iscorrect)
    }

    display_question(){
        // // Clear out div
        document.getElementById("div-3").innerHTML = "";
        document.getElementById("completed").innerHTML = "";
        const cont = document.getElementById('content');
        cont.classList.add('hidden');
        
        const scr = document.getElementById('score-main');
        scr.classList.remove('hidden');


        const dash_body = document.getElementById('dash');
        dash_body.classList.add('hidden');

        // Create a new div in which all new elements will be present
        const mainContainer = document.createElement('div');

        // Show hidden buttons (prev and next)
        show_buttons();

        // Adding the Topic header
        const topic_header = document.getElementById("topic-header");
        topic_header.innerHTML = "Topic: "+ '"'+this.topic+'"';
        topic_header.className = "font-medium mt-4";

        // Forming the paragraph element aka question text
        const question_header = document.createElement("p");
        const q_text = document.createTextNode("Q. " + this.question);
        question_header.appendChild(q_text);
        question_header.className = "font-bold text-lg mb-3 mt-3";
    
        mainContainer.appendChild(question_header);
        
        // Forming MCQ options using buttons
        this.options.forEach((option, index) => {
            const optionButton = document.createElement("button");
            const optionText = document.createTextNode(option);
            optionButton.appendChild(optionText);
            //sets unique id attribute to each button based on the index in options array
            optionButton.setAttribute('data-option-id', index); 


            // Setting class name 'mcq-btn' to access dynamically created buttons later
            optionButton.className = 'mcq-btn bg-violet-50 border border-3 border-gray-800 rounded-md m-2 w-1/2 p-3';
            mainContainer.appendChild(optionButton);

            const lineBreak = document.createElement("br");
            mainContainer.appendChild(lineBreak);
            
        });

        const q_section = document.getElementById("div-3");
        q_section.appendChild(mainContainer);

        this.checkIfCorrect();
        this.updateScore();

        return mainContainer;
    }


    checkIfCorrect() {
        const ans = this.answer;
        const buttons = document.querySelectorAll('.mcq-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.innerHTML == ans) {
                    buttons.forEach(b => b.classList.remove('bg-emerald-200'));
                    buttons.forEach(b => b.classList.remove('bg-rose-300'));
                    button.classList.add('bg-emerald-200');
                    score += 1;
                    disableButtons();

                } else {
                    buttons.forEach(b => b.classList.remove('bg-emerald-200'));
                    buttons.forEach(b => b.classList.remove('bg-rose-300'));
                    button.classList.add('bg-rose-300');
                    disableButtons();
                }
                total_questions_attempted += 1;
                    
            });
        });
    }

    updateScore(){
        // Updating Score display
        const score_display = document.getElementById('score-display');
        if(score <= total_questions_attempted){
            score_display.innerHTML = "Score: " + score + " / " + total_qs;
        }

        const scoreHeading = document.getElementById('score-heading');
        scoreHeading.innerHTML = `Your Score: ${score} / 10`;

        const scoreComment = document.getElementById('score-comment');

        if(score < 2){
            scoreComment.innerHTML = "Better luck next time!";
        }
        else if(score > 2 && score <=4){
            scoreComment.innerHTML = "Quiz Completed!";
        }
        else if(score >= 5 && score < 8){
            scoreComment.innerHTML = "Well Done!";
        }
        else if(score >=9){
            scoreComment.innerHTML = "Excellent!";
        }
    }
};



// -----------------------------------------------------------------------------
// General utility functions


function disableButtons(){
    const buttons = document.querySelectorAll('.mcq-btn');
    buttons.forEach(button => {
        button.disabled = true;
    });

}

function hide_buttons(){
    const btn1 = document.getElementById("next-btn");
    const btn2 = document.getElementById("prev-btn");

    if(btn1) btn1.classList.add('hidden');
    if(btn2) btn2.classList.add('hidden');

}

function show_buttons(){
    const btn1 = document.getElementById("next-btn");
    const btn2 = document.getElementById("prev-btn");
    const prog_bar = document.getElementById("div-5")

    if(btn1) btn1.classList.remove('hidden');
    if(btn2) btn2.classList.remove('hidden');
    if(prog_bar) prog_bar.classList.remove('hidden');
}

function shuffle_array(arr){  //fisher-yates shuffle algo
    for(let i = arr.length-1; i > 0; i--){
        let j = Math.floor(Math.random()*(i+1));
        let k = arr[i];
        arr[i] = arr[j];
        arr[j] = k;
    }
}

function wipeout(){
    document.getElementById('div-3').innerHTML = "";
    // document.getElementById('dash').innerHTML = "";

    // const f = document.getElementById('feminism');
    // f.classList.add('hidden');
    // const com = document.getElementById('communism');
    // com.classList.add('hidden');
    // const l = document.getElementById('leninism');
    // l.classList.add('hidden');
    const c = document.getElementById('content');
    c.classList.add('hidden');
    

    // const d = document.getElementById('quiz');
    // d.classList.add('hidden');

}

function dashboard(){       //function to display dashboard
    reset();
    wipeout();
    

    const btn = document.getElementById('next-btn');
    btn.classList.add('hidden');
    const btn1 = document.getElementById('prev-btn');
    btn1.classList.add('hidden');
    const sm = document.getElementById('score-main');
    sm.classList.add('hidden');
    const prog_bar = document.getElementById('div-5');
    prog_bar.classList.add('hidden');

    // const th = document.getElementById('topic-header');
    // th.classList.add('hidden');


    const t = document.getElementById('topic-header');
    t.innerHTML = "";

    const dash = document.createElement('div');
    const dash_header = document.createElement('h1');
    const dash_header_text = document.createTextNode('Dashboard');
    dash_header.appendChild(dash_header_text);


    dash_header.className = "font-bold text-3xl text-slate-800 border-b border-slate-800 pb-3";
    dash.appendChild(dash_header);

    const dash_body = document.getElementById('dash');
    dash_body.classList.remove('hidden');

    const mainContainer = document.getElementById('div-3');
    mainContainer.appendChild(dash);


    return dash;
}


function display_study(topic_name){  //study functionality will be added here. Topic btns will only display the content
    wipeout();
    const dash = document.getElementById('dash');
    dash.classList.add('hidden');

    const d  = document.getElementById('content');
    const c  = document.getElementById('communism');
    const f  = document.getElementById('feminism');
    const l  = document.getElementById('leninism');
    const m = document.getElementById('marxism');   
    const cap = document.getElementById('capitalism');
    const prev = document.getElementById('study-prev-btn');

    if(topic_name === 'communism'){
        
        d.classList.remove('hidden');

        c.classList.remove('hidden');

        f.classList.add('hidden');

        l.classList.add('hidden');
        cap.classList.add('hidden');
        m.classList.add('hidden');
        prev.classList.add('hidden');

    }

    else if(topic_name === 'feminism'){

        d.classList.remove('hidden');

        f.classList.remove('hidden');
        c.classList.add('hidden');
        l.classList.add('hidden');
        cap.classList.add('hidden');
        m.classList.add('hidden');
        prev.classList.remove('hidden');
    }
    else if(topic_name === 'leninism'){

        d.classList.remove('hidden');

        l.classList.remove('hidden');
        c.classList.add('hidden');
        f.classList.add('hidden');
        cap.classList.add('hidden');
        m.classList.add('hidden');
    }
    else if(topic_name === 'capitalism'){

        d.classList.remove('hidden');

        cap.classList.remove('hidden');

        c.classList.add('hidden');
        f.classList.add('hidden');
        l.classList.add('hidden');
        m.classList.add('hidden');

    }
    else if(topic_name === 'marxism'){

        d.classList.remove('hidden');

        m.classList.remove('hidden');

        c.classList.add('hidden');
        f.classList.add('hidden');
        l.classList.add('hidden');
        // next.classList.add('hidden');
    }

}



function open_pdf(){
    var url = 'pol100_course_pack.pdf'; // Replace with your PDF URL
    window.open(url, '_blank')
}

function open_notes(){
    var url = 'pol100_notes.pdf';
    window.open(url, '_blank');
}

function open_outline(){
    var url = 'pol100_outline.pdf';
    window.open(url, '_blank');
}