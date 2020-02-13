let values = [];
let height = 600;
let width = 1000;
let barWidth = 20;
let arrayElements = width / barWidth;

function setup() {
  createCanvas(width, height);
  background(0);
  strokeWeight(1)

  values = new Array(arrayElements);

  for (let i = 0; i < values.length; i++) {
    values[i] = random(height); //height argument is a scaling factor
    //values[i] = noise(i/100.0)*height;
  }

  //noLoop();
}


function draw() {
  clear();
  background(0);
  stroke(255);

  for (let i = 0; i < values.length; i++){
    for (let j = 0; j < values.length - i; j++){
      
      if(values[j] > values[j+1]){
        swapPair(j, j+1, values)
      }
      
      for (let i = 0; i < values.length; i++) {
        //stroke(255);
        //line(i*barWidth, height, i*barWidth, height - values[i]);
        rect(i*barWidth, values[i], barWidth, height - values[i]);
      }
      
    }
    
    // for (let i = 0; i < values.length; i++) {
    //   //stroke(255);
    //   //line(i*barWidth, height, i*barWidth, height - values[i]);
    //   rect(i*barWidth, values[i], barWidth, height - values[i]);
    // }
  }


}

function swapPair(element_A, element_B, array){
  let tempVal = array[element_A];
  array[element_A] = array[element_B];
  array[element_B] = tempVal;
}