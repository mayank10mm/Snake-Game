// game const and var

let inputDir = {x: 0, y: 0};
let foodSound = new Audio('music/foodsoundd.mp3');
let gameOverSound = new Audio('music/gameover.mp3');
let moveSound = new Audio('music/move.mp3')
let musicSound = new Audio('music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr =[ {x: 13, y: 15}];
food = {x: 6, y: 7};


// game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed ){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
   
}

function isCollide(snake) {
    // if you bump itno yourself
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if you bump into the wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }
        return false;
}

function gameEngine(){
//   part 1: updationg snake array & food 
if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir = {x: 0, y :0};
    alert("Game Over. press any key to play again ");
    snakeArr = [{x: 13, y: 15}]
    musicSound.play();
    score = 0;
}

//If ypu have eaten the food, icrement the score and regenrate the food
if(snakeArr[0.].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    score += 1;
    if(score> hiscoreval){
        hiscoreval = score;
        localStorage.setItem("highScore", JSON.stringify(hiscoreval));
        highScoreBox.innerHTML ="High Score: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
    let a = 2;
    let b = 16;
    food = {x: Math.round( a + (b-a)*Math.random()), y:Math.round( a + (b-a)*Math.random())}
}

//Moving the snake
for(let i = snakeArr.length-2; i >= 0 ;i--){
    snakeArr[i + 1] = {...snakeArr[i]};
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

// part 2: display the snake  
board.innerHTML= "";
snakeArr.forEach((e, index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if(index === 0){
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
});
// display the snake 
   foodElement = document.createElement('div');
   foodElement.style.gridRowStart = food.y;
   foodElement.style.gridColumnStart = food.x;
   foodElement.classList.add('food');
   board.appendChild(foodElement);

}














// main logic starts here
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    hiscoreval =0;
    localStorage.setItem("highScore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(highScore)
    highScoreBox.innerHTML = "High Score:" + highScore
}
window.requestAnimationFrame(main);window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
            
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        
    }
})

