///< reference path="./p5.global-mode.d.ts" / >


function setup() {
    // put setup code here
    createCanvas(800, 600);
    let backgroundColour = 49;
    background(backgroundColour);
    gamePaddle = new Paddle();
    gamePaddle.setColor(color('#BB86FC'))
    gameBall = new Ball();
    gameBall.setColor(color('#BB86FC'));
  }     

function draw(){
    //ellipse(150, 150, 50, 50);
    gamePaddle.draw();
    gameBall.draw();

}