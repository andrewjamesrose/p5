///< reference path="./p5.global-mode.d.ts" / >
const backgroundColour = 49;

function setup() {
    // put setup code here
    createCanvas(800, 600);

    background(backgroundColour);
    gamePaddle = new Paddle();
    gamePaddle.setColor(color('#BB86FC'))
    gameBall = new Ball();
    gameBall.setColor(color('#BB86FC'));
    testBlock1 = new Block(100, 100, 1);
    testBlock2 = new Block(100, 200, 2);
    testBlock3 = new Block(100, 300, 3);
  }     



function draw(){
    clear();
    background(backgroundColour);
    let keyInput = "";
    keyInput = checkInput();
    if(keyInput==="right" ||keyInput === "left") {
        gamePaddle.update(keyInput);
    }

    if(gameBall.inactive){
        if (keyInput ==="launch"){
            gameBall.activate();  
        }
    }

    if(!gameBall.inactive){
        gameBall.update()
    }


    gamePaddle.draw();
    gameBall.draw();
    testBlock1.draw();
    testBlock2.draw();
    testBlock3.draw();

    fill(255);
    text("FrameRate = " + int(getFrameRate()), 700, 20); 

}

function checkInput(){
    if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
        return 'left';
    } 

    if (!keyIsDown(LEFT_ARROW) && keyIsDown(RIGHT_ARROW)) {
        return 'right';
    }

    if (keyIsDown(32)) {
        return 'launch';
    }

    return "";

}