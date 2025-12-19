let h2 = document.querySelector("h2");
let level = 0;
let started = false;
let btnCols = ["yellow", "green", "red", "blue"];
let gameSeq = [];
let userSeq = [];
let highScore = 0;
let hS = document.querySelector("p");
let span = document.createElement("span");
hS.appendChild(span);

const sounds = {
    yellow : new Audio("sounds/yellow.wav"),
    green : new Audio("sounds/green.wav"),
    red : new Audio("sounds/red.wav"),
    blue : new Audio("sounds/blue.wav"), 
    over : new Audio("sounds/over.wav")
};

function play(color){
    sounds[color].currentTime = 0;
    sounds[color].play()
}

function gameFlash(btn){
    btn.classList.add("white");
    let sbtn = btn.getAttribute("id");
    play(sbtn);
    setTimeout(function(){
        btn.classList.remove("white");
    }, 250);  
}

document.addEventListener("mousedown", function(){
    if(started == false){
        started = true;
        levelUp();
    }
    
});

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randBtn = Math.floor(Math.random()*4);
    let btncol = btnCols[randBtn];
    let toFlashBtn = document.querySelector(`.${btncol}`);
    setTimeout(()=>{
        gameFlash(toFlashBtn);
    }, 500);
    gameSeq.push(btncol);
    console.log(gameSeq);
}

function chkSeq(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            levelUp();
        }
    }else{
        setTimeout(play("over"),500);
        let body = document.querySelector("body");
        body.classList.add("red");
        setTimeout(()=>{
            body.classList.remove("red");
        }, 150);
        h2.innerText = `Game Over! press any key to start again \n Your Score was ${level}`;
        reset();
    }
}

function userClick(){
    let btn = this;
    gameFlash(btn);

    let userColor = this.getAttribute("id");
    userSeq.push(userColor);
    chkSeq(userSeq.length-1);
}

let btns = document.querySelectorAll(".btn");

for(btn of btns){
    btn.addEventListener("click",userClick)
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    if(highScore<level){
        highScore = level;
        span.innerText = highScore;       
    }
    level = 0;
}


 