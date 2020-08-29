///< reference path="./p5.global-mode.d.ts" / >
const backgroundColour = 49;
let triangleArray = [];
const maxPoints = 3;
let input, button, greeting
let stateReset;

function setup() {
    // put setup code here
    createCanvas(800, 600);
    background(backgroundColour);

    stateReset=false;
    button = createButton('Reset');
    button.position(20, 20);
    button.mousePressed(reset);

  }     



function draw(){

}

function mousePressed(){
  clear();
  background(backgroundColour);
  stroke(200);  

  if(stateReset){
    stateReset = false;
  }else {
  
  let mouseVector = createVector(mouseX, mouseY);
  
  if (triangleArray.length < 3){
    addNewPoint(mouseVector);
  } else {

    if(pointInTriangle(triangleArray, mouseVector)){
      //draw circle green
      noStroke();
      textSize(18);
      fill(0, 180, 0);
      circle(mouseVector.x, mouseVector.y, 7);
      text('point inside triangle', 300, 30);
    } else {
      //draw circle red
      noStroke();
      textSize(18);
      fill(220, 0, 0);
      circle(mouseVector.x, mouseVector.y, 7);
      text('point outside triangle', 300, 30);
    }
  }


  fill(200);
  stroke(200);
  for (i =0; i < triangleArray.length; i++){
    circle(triangleArray[i].x, triangleArray[i].y, 7);
  }

  if (triangleArray.length == maxPoints){
    for (i =0; i < triangleArray.length; i++){
        next = i+1;
      
        if(i==maxPoints-1){
          next = 0;
        }
      line(triangleArray[i].x, triangleArray[i].y, triangleArray[next].x, triangleArray[next].y);
    }
    
  }
}
}

function addNewPoint(newPointVector){
  if (triangleArray.length >=3) {
      triangleArray.pop();
    } 
    triangleArray.unshift(newPointVector);
}

function reset(){
  clear();
  background(backgroundColour);
  triangleArray =[];
  stateReset = true;
}

function pointInTriangle(trianglePoints, checkPoint){
  // from: https://blackpawn.com/texts/pointinpoly/default.html

  let vA = createVector(trianglePoints[0].x, trianglePoints[0].y) ;
  let vB = createVector(trianglePoints[1].x, trianglePoints[1].y);
  let vC = createVector(trianglePoints[2].x, trianglePoints[2].y);
  let vP = checkPoint;

  let v0, v1, v2;
  // this method acts on vC itself but returns the new value
  // v0 = vC.sub(vA);
  // v1 = vB.sub(vA);
  // v2 = vP.sub(vA);

  v0 = p5.Vector.sub(vC, vA);  
  v1 = p5.Vector.sub(vB, vA);
  v2 = p5.Vector.sub(vP, vA);

  // Compute dot products
  let dot00 = p5.Vector.dot(v0, v0);
  let dot01 = p5.Vector.dot(v0, v1);
  let dot02 = p5.Vector.dot(v0, v2);
  let dot11 = p5.Vector.dot(v1, v1);
  let dot12 = p5.Vector.dot(v1, v2);

  // Compute barycentric coordinates
  let invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
  let u = (dot11 * dot02 - dot01 * dot12) * invDenom;
  let v = (dot00 * dot12 - dot01 * dot02) * invDenom;

  // Check if point is in triangle
  return (u >= 0) && (v >= 0) && (u + v < 1);

}