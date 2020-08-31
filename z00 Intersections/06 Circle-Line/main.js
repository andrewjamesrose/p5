///< reference path="./p5.global-mode.d.ts" / >
const backgroundColour = 49;
let button;
let stateReset;
let circleExists;
let lineExists;
let systemState;

function setup() {
    // put setup code here
    createCanvas(800, 600);
    background(backgroundColour);

    stateReset=false;
    circleExists = false;
    lineExists = false;

    button = createButton('Reset');
    button.position(20, 20);
    button.mousePressed(reset);

    textSize(18);
    fill(0, 180, 0);
    text('Click to add a circle', 300, 30);

    systemState = 0;

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
  
    if ((!circleExists) && (systemState == 0)) {
      
      testCircle = new circleObject(mouseVector.x, mouseVector.y, random(30,100));
      testCircle.draw();
      circleExists = true;

      systemState = 1;
    }

    if ((!lineExists) && (systemState == 0)) {
      
      testLine = new vectorLine(mouseVector.x, mouseVector.y, random(10, 20), random(0,TWO_PI));
      testLine.draw();
      testCircle.draw();
      lineExists=true;
    }

    systemState = 0;
    
  }
  if (circleExists&&lineExists){

    testLine.draw();
    testCircle.draw();
    
    if(testCircleLineIntersection(testCircle, testLine)){
      noStroke();
      textSize(18);
      fill(0, 180, 0);
      text('intersections detected', 300, 30);
 
    } else {
      noStroke();
      textSize(18);
      fill(220, 0, 0);
      text('no intersections detected', 300, 30);

    }

      
      // noStroke;
      // fill(0, 180, 0);
      // //text(pointLineSide(testLine, mouseVector).toFixed(0), 300, 30);
      // //circle(mouseVector.x, mouseVector.y, 7);
      // testLine1.draw();
      // testLine2.draw();
      
      // if(lineIntersectionTest(testLine1, testLine2)){
      
      // //   //inside - draw green circle
      // //   testRectangle.draw();
      //   noStroke();
      //   textSize(18);
      //   fill(0, 180, 0);
      // //   circle(mouseVector.x, mouseVector.y, 7);
      // text('lines cross', 300, 30);
      //  } else {
      //   // testLine1.draw();
      //   // testLine2.draw();
      // //   //outside - draw red circle
      // //   
      //   noStroke();
      //   textSize(18);
      //   fill(220, 0, 0);
      // //   circle(mouseVector.x, mouseVector.y, 7);
      // text('lines don\'t cross', 300, 30);
         
      //  }
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
  circleExists = false;

}

function testCircleLineIntersection(inputCircle, inputVectorLine){
//https://stackoverflow.com/questions/1073336/circle-line-segment-collision-detection-algorithm/1084899
// Note - this does only detects line intersections
// if the line is fully contained inside the circle no collision is detected



  // E is the starting point of the ray,
  // L is the end point of the ray,
  // C is the center of sphere you're testing against
  // r is the radius of that sphere
  // Compute:
  // d = L - E ( Direction vector of ray, from start to end )
  // f = E - C ( Vector from center sphere to ray start )

  let d = createVector(inputVectorLine.B.x-inputVectorLine.A.x, inputVectorLine.B.y-inputVectorLine.A.y);
  let f = createVector(inputVectorLine.A.x-inputCircle.x, inputVectorLine.A.y-inputCircle.y);
  let r = inputCircle.radius;
  let a = p5.Vector.dot(d,d);
  let b = 2 * p5.Vector.dot(d,f);
  let c = p5.Vector.dot(f,f) - r*r ;

  let discriminant = b*b-4*a*c;

if( discriminant < 0 )
{
  // no intersection
  return false;
}
else
{
  // ray didn't totally miss sphere,
  // so there is a solution to
  // the equation.

  discriminant = sqrt( discriminant );

  // either solution may be on or off the ray so need to test both
  // t1 is always the smaller value, because BOTH discriminant and
  // a are nonnegative.
  let t1 = (-b - discriminant)/(2*a);
  let t2 = (-b + discriminant)/(2*a);

  // 3x HIT cases:
  //          -o->             --|-->  |            |  --|->
  // Impale(t1 hit,t2 hit), Poke(t1 hit,t2>1), ExitWound(t1<0, t2 hit), 

  // 3x MISS cases:
  //       ->  o                     o ->              | -> |
  // FallShort (t1>1,t2>1), Past (t1<0,t2<0), CompletelyInside(t1<0, t2>1)

  if( t1 >= 0 && t1 <= 1 )
  {
    // t1 is the intersection, and it's closer than t2
    // (since t1 uses -b - discriminant)
    // Impale, Poke
    return true ;
  }

  // here t1 didn't intersect so we are either started
  // inside the sphere or completely past it
  if( t2 >= 0 && t2 <= 1 )
  {
    // ExitWound
    return true ;
  }

  // no intn: FallShort, Past, CompletelyInside
  return false ;

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
    line(this.A.x, this.A.y, this.B.x, this.B.y);
  }
}

class circleObject{
  constructor(_x, _y, _radius){
    this.x = _x;
    this.y = _y;
    this.radius = _radius;
  }

  draw() {
    noFill();
    beginShape();
    strokeWeight(3);
    stroke(200);
    circle(this.x, this.y, 2*this.radius);

  }


}