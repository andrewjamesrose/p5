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
      testLine1 = new vectorLine(mouseVector.x, mouseVector.y, random(75, 200), random(0,TWO_PI));
      testLine1.draw();
      testLine2 = new vectorLine(mouseVector.x + random(0,100), mouseVector.y+random(0,100), random(75, 200), random(0,TWO_PI));
      testLine2.draw();
      lineExists=true;
    } else {

      
      noStroke;
      fill(0, 180, 0);
      //text(pointLineSide(testLine, mouseVector).toFixed(0), 300, 30);
      //circle(mouseVector.x, mouseVector.y, 7);
      testLine1.draw();
      testLine2.draw();
      
      if(lineIntersectionTest(testLine1, testLine2)){
      
      //   //inside - draw green circle
      //   testRectangle.draw();
        noStroke();
        textSize(18);
        fill(0, 180, 0);
      //   circle(mouseVector.x, mouseVector.y, 7);
      text('lines cross', 300, 30);
       } else {
        // testLine1.draw();
        // testLine2.draw();
      //   //outside - draw red circle
      //   
        noStroke();
        textSize(18);
        fill(220, 0, 0);
      //   circle(mouseVector.x, mouseVector.y, 7);
      text('lines don\'t cross', 300, 30);
         
       }
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

function lineIntersectionTest(inputVectorLine_1, inputVectorLine_2){
//https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect

  let p0_x = inputVectorLine_1.A.x;
  let p0_y = inputVectorLine_1.A.y

  let p2_x = inputVectorLine_2.A.x;
  let p2_y = inputVectorLine_2.A.y

  let s10_x = inputVectorLine_1.B.x - inputVectorLine_1.A.x;
  let s10_y = inputVectorLine_1.B.y - inputVectorLine_1.A.y;
  let s32_x = inputVectorLine_2.B.x - inputVectorLine_2.A.x;
  let s32_y = inputVectorLine_2.B.y - inputVectorLine_2.A.y;

  let denom = s10_x * s32_y - s32_x * s10_y;
  
  if (denom == 0) {
      return 0; // Collinear
  }

  denomPositive = (denom > 0);

  let s02_x = p0_x - p2_x;
  let s02_y = p0_y - p2_y;
  let s_numer = s10_x * s02_y - s10_y * s02_x;
  
  if ((s_numer < 0) == denomPositive){
      return 0; // No collision
  }

  let t_numer = s32_x * s02_y - s32_y * s02_x;
  if ((t_numer < 0) == denomPositive){
      return 0; // No collision
  }

  if (((s_numer > denom) == denomPositive) || ((t_numer > denom) == denomPositive)){
      return 0; // No collision
  }
  
  // Collision detected
  let t = t_numer / denom;
  let i_x = p0_x + (t * s10_x);
  let i_y = p0_y + (t * s10_y);

  return 1;


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
    line(this.A.x, this.A.y, this.B.x, this.B.y);

  }

}