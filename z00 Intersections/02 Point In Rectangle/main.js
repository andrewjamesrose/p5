///< reference path="./p5.global-mode.d.ts" / >
const backgroundColour = 49;
let triangleArray = [];
let input, button, greeting
let stateReset;
let rectExists;

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
    text('Click to add a new rectangle', 300, 30);

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
  
    if (!rectExists){
      testRectangle = new Rectangle(mouseVector.x, mouseVector.y, random(20, 200), random(20, 200), random(0,TWO_PI));
      testRectangle.draw();
      rectExists=true;
    } else {

      if(pointInRectangle(testRectangle, mouseVector)){
        //inside - draw green circle
        testRectangle.draw();
        noStroke();
        textSize(18);
        fill(0, 180, 0);
        circle(mouseVector.x, mouseVector.y, 7);
        text('point inside rectangle', 300, 30);
      } else {
        //outside - draw red circle
        testRectangle.draw();
        noStroke();
        textSize(18);
        fill(220, 0, 0);
        circle(mouseVector.x, mouseVector.y, 7);
        text('point outside rectangle', 300, 30);
         
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
  text('Click to add a new rectangle', 300, 30);
  stateReset=true;
  rectExists = false;

}

function pointInRectangle(myRectangle, checkPoint){
  //could alsodo this with a piece-wise convex hull method
  
  let AM = p5.Vector.sub(checkPoint, myRectangle.A);
  let AB = p5.Vector.sub(myRectangle.B, myRectangle.A);
  let AD = p5.Vector.sub(myRectangle.D, myRectangle.A);

  dot_AM_AB = p5.Vector.dot(AM, AB);
  dot_AB_AB = p5.Vector.dot(AB, AB);
  dot_AM_AD = p5.Vector.dot(AM, AD);
  dot_AD_AD = p5.Vector.dot(AD, AD);

  return (
    (0 < dot_AM_AB) &&
    (dot_AM_AB<dot_AB_AB) &&
    (0 < dot_AM_AD) &&
    (dot_AM_AD < dot_AD_AD)
  )

}

class Rectangle {
  constructor(_x, _y, _width, _height, _angleRad) {
    this.A = createVector(_x, _y);
    this.B = createVector(_x+_height*sin(_angleRad),_y-_height*cos(_angleRad));
    this.D = createVector(_x+_width*cos(_angleRad), _y + _width*sin(_angleRad));
    //this.C =  
    let c1 = p5.Vector.sub(this.B, this.A);
    let c2 = p5.Vector.sub(this.D, this.A);
    this.C = p5.Vector.add(c1, c2);
    this.C.add(this.A);
  }


  draw(){
    noFill();
    beginShape();
    strokeWeight(3);
    stroke(200);
    vertex(this.A.x, this.A.y);
    vertex(this.B.x, this.B.y);
    //vertex(this.D.x, this.D.y);
    vertex(this.C.x, this.C.y);
    vertex(this.D.x, this.D.y);
    endShape(CLOSE);

  }

}