///< reference path="./p5.global-mode.d.ts" / >
const backgroundColour = 49;
let button;
let stateReset;
let lineExists;

function setup() {
    // put setup code here
    createCanvas(800, 600);
    background(backgroundColour);

    stateReset=false;
    rectExists = false;
    button = createButton('Reset');
    button.position(20, 20);
    button.mousePressed(reset);

    textSize(18);
    fill(0, 180, 0);
    text('Click to add a new random line', 300, 30);

  //generate a rectangle of a random size

  }     



function draw(){

}

function mousePressed(){


  if(stateReset){
    stateReset = false;
  }else {
    clear();
    background(backgroundColour);
    stroke(200);  
    
  let mouseVector = createVector(mouseX, mouseY);

  //create a new rectangle
  //set tell script the rectangle exists
  //draw the rectangle
  
    if (!lineExists){
      testLine = new vectorLine(mouseVector.x, mouseVector.y, random(20, 200), random(0,TWO_PI));
      testLine.draw();
      lineExists=true;
    } else {

      
      noStroke;
      fill(0, 180, 0);
      text(pointLineSide(testLine, mouseVector).toFixed(0), 300, 30);
      circle(mouseVector.x, mouseVector.y, 7);
      testLine.draw();
      // if(pointInRectangle(testRectangle, mouseVector)){
      //   //inside - draw green circle
      //   testRectangle.draw();
      //   noStroke();
      //   textSize(18);
      //   fill(0, 180, 0);
      //   circle(mouseVector.x, mouseVector.y, 7);
      //   text('point inside rectangle', 300, 30);
      // } else {
      //   //outside - draw red circle
      //   testRectangle.draw();
      //   noStroke();
      //   textSize(18);
      //   fill(220, 0, 0);
      //   circle(mouseVector.x, mouseVector.y, 7);
      // //   text('point outside rectangle', 300, 30);
         
      // }
    }
  }
}


function reset(){
  clear();
  background(backgroundColour);
  textSize(18);
  fill(0, 180, 0);
  noStroke();
  text('Click to add a new random line', 300, 30);
  stateReset=true;
  lineExists = false;

}

function pointLineSide(inputVectorLine, checkPoint){
  //-1 is right, +1 is left
  let A = inputVectorLine.A;
  let B = inputVectorLine.B;
  let C = checkPoint;

  let output = ((C.x - A.x) * (-B.y + A.y) + (C.y - A.y) * (B.x - A.x));

  if(output>0) {
    return 1;
  }
  
  if(output<0){
    return -1;
  }

  if(output==0) {
    return 0;
  }

}

class vectorLine {
  constructor(_x, _y, _length, _angleRad) {
    this.A = createVector(_x, _y);
    this.B = createVector(_x+_length*sin(_angleRad),_y-_length*cos(_angleRad));
     }


  draw(){
    noFill();
    beginShape();
    strokeWeight(3);
    stroke(200);
    line(this.A.x, this.A.y, this.B.x, this.B.y)

  }

}