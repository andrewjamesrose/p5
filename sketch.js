function setup() {
  // put setup code here
  createCanvas(720, 400);

}

function draw() {
  // put drawing code here

}

let triangleArray = [];
let lineEquations = [];
let bisectors = [];
const maxPoints = 3;


function mousePressed(){
  clear();
  let mouseVector = createVector(mouseX, mouseY);
  addNewPoint(mouseVector);

  for (i =0; i < triangleArray.length; i++){
    circle(triangleArray[i].x, triangleArray[i].y, 10);
  }

  if (triangleArray.length == maxPoints){
    for (i =0; i < triangleArray.length; i++){
        next = i+1;
      
        if(i==maxPoints-1){
          next = 0;
        }

      line(triangleArray[i].x, triangleArray[i].y, triangleArray[next].x, triangleArray[next].y);

      stroke(235, 194, 237);
      bisectors[i] = findBisector(triangleArray[i], triangleArray[next]);
      lineEquations[i] = findLineEquation(triangleArray[i], triangleArray[next]);
      drawBisectors(bisectors[i]);
      stroke(0,0,0);      
    }

    //calculateCircumCircle

    lineA = lineEquations[0];
    lineB = lineEquations[1];
    targetNode = triangleArray[2];
    //calculateCircumCircle(lineEquations[0], lineEquations[1], triangleArray[0]);
    
    noFill();
    calculateCircumCircle(lineA, lineB, targetNode);
    fill();
  }
 
  

}

function calculateCircumCircle(lineA, lineB, targetPoint){
  let circleCentreVector = findIntersection(lineA, lineB);


  let term1 = Math.pow((Number(circleCentreVector.x) - Number(targetPoint.x)), 2);
  let term2 = Math.pow((Number(circleCentreVector.y) - Number(targetPoint.y)), 2);

  let circleRadius = Math.sqrt(term1 + term2 );

  circle(circleCentreVector.x, circleCentreVector.y, 2*circleRadius);
  
}

function findIntersection(lineA, lineB){
  
  let x_Cross = (Number(lineB.y) - Number(lineA.y)) / (Number(lineA.gradient) - Number(lineB.gradient));
  let y_Cross = Number(lineA.gradient) * Number(x_Cross) + Number(lineA.y);
  
  outputVector = createVector(x_Cross, y_Cross);
  return outputVector;
}

function findBisector(vPointA, vPointB){
  let newMidPoint = createVector((vPointB.x + vPointA.x)/2, (vPointA.y + vPointB.y)/2); 
//  circle(newMidPoint.x, newMidPoint.y, 10);

//   // y = mx + c
//   // y = othoGrad(1000) + point(mid.x, mid.y)

  let CurrentGradient = (vPointA.y - vPointB.y)/(vPointA.x - vPointB.x);
  let orthGrad = -1/CurrentGradient;

  let localEquation = new LineEquation(orthGrad, newMidPoint.x, newMidPoint.y);
  return localEquation;

//   let newY1 = orthGrad * 1000 + newMidPoint.y;
//   let newX1 = 1000 + newMidPoint.x;

//   let newY2 = orthGrad * -1000 + newMidPoint.y;
//   let newX2 = -1000 + newMidPoint.x;

//   line (newX1, newY1, newX2, newY2);
}

function findLineEquation(vPointA, vPointB){
  let newMidPoint = createVector((vPointB.x + vPointA.x)/2, (vPointA.y + vPointB.y)/2); 
  let CurrentGradient = (vPointA.y - vPointB.y)/(vPointA.x - vPointB.x);
  let orthGrad = -1/CurrentGradient;

  let cValue = newMidPoint.y - orthGrad *newMidPoint.x; 

  let localEquation = new LineEquation(orthGrad, 0, cValue);
  return localEquation;
}

function drawBisectors(lineEquationObject){
  let xPoint = lineEquationObject.x;
  let yPoint = lineEquationObject.y;
  let _gradient = lineEquationObject.gradient;

  let newY1 = _gradient * 1000 + yPoint;
  let newX1 = 1000 + xPoint;

  let newY2 = _gradient * -1000 + yPoint;
  let newX2 = -1000 + xPoint;

 
  circle(xPoint, yPoint, 5);
  line (newX1, newY1, newX2, newY2);

}

function addNewPoint(newPointVector){
  if (triangleArray.length >=3) {
      triangleArray.pop();
    } 
    triangleArray.unshift(newPointVector);
}

function addnewLineEquation(gradient, xPoint, yPoint){
  if (lineEquations.length >=3) {
    lineEquations.pop();
  }
  lineEquations.unshift(gradient, xPoint, yPoint);
}

function LineEquation(lineGradient, cX, cY){
  var _gradient = lineGradient;
  var _x = cX;
  var _y = cY;

  Object.defineProperties(this, {
    "gradient": {
      get: function () {
          return _gradient;
      }
    },
    "x": {
        get: function () {
            return _x;
        }
    },
    "y": {
      get: function () {
          return _y;
      }
    }
  });
}

// calculate midpoints of each line
// calculate bisectorVectorA
// calculate bisectorVectorB
// find intersection point of bVA and bVB == O
// find r == distance from A to O
// 
