let coswave = [];

let marginDistance = 10;
let elementWidth = 100;
let radiusWidth = 80;
let numberCols = 7;
let numberRows = 7;

let angleNow = 0.0;
let angularSpeed = 0.01;

function setup() {
  createCanvas(900, 900);
  background(0);
  //noLoop();
}


function draw() {
  clear();
  background(0);
  stroke(255);
  noFill();
  for(i=2; i<=numberCols+1; i++){
    strokeWeight(2)
    centre_X = marginDistance + (i-1) * elementWidth + radiusWidth;
    centre_Y = 50;
    ellipse(centre_X, centre_Y, radiusWidth);
  
    let xPoint = radiusWidth/2 * cos(angleNow * (i-1) - HALF_PI);
    let yPoint = radiusWidth/2 * sin(angleNow * (i-1) - HALF_PI);

    strokeWeight(8);
    
    point(centre_X + xPoint, centre_Y + yPoint);

    strokeWeight(1);
    line(centre_X + xPoint,  0, centre_X + xPoint, 900);

    strokeWeight(2);
    centre_Y = centre_X;
    centre_X = 50;
    ellipse(centre_X, centre_Y, radiusWidth);

    xPoint = radiusWidth/2 * cos(angleNow * (i-1) - HALF_PI);
    yPoint = radiusWidth/2 * sin(angleNow * (i-1) - HALF_PI);

    strokeWeight(8);

    point(centre_X + xPoint, centre_Y + yPoint);

    strokeWeight(1);
    line(0,  centre_Y + yPoint, 900, centre_Y + yPoint);

  }

  angleNow += angularSpeed;

  if (angleNow > TWO_PI){
    angleNow = 0;
  }
}
