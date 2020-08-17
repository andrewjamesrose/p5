/// <reference path= "../zzTSDefinitions/p5.global-mode.d.ts" />
// note - triple slash is used to define an external reference
// ...and double slash is used for line comments...

"use strict"; //set strict to require object definitions

let fireworks =[];
let gravityForce;

function setup() {
    createCanvas(900, 700);
    stroke(255);
    strokeWeight(4);
    gravityForce = createVector(0,0.05);
    colorMode(HSB);
    //firework = new Particle(random(width), height);  //note that coordinate system starts with (0,0) = top left. positive x,y are left and down.

}

function draw(){
    background(20);
    if(random(0,1) <0.04){
        fireworks.push(new Firework(random(0,360)));
    }
    for(let i = fireworks.length-1; i >=0; i--){
        fireworks[i].update(gravityForce);
        fireworks[i].show();
        if (fireworks[i].done()){
            fireworks.splice(i,1);
        }
    }
    console.log(fireworks.length);
    // firework.show();
    // firework.update(gravityForce);
}

