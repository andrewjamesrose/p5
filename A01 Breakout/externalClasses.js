class Ball {
    constructor(){
        this.color = color(255);
        this.radius = 20;
        this.location = createVector(width/2, height/2);
    }

    setColor(ballColor){
        this.color = ballColor;
    }

    draw(){
        fill(this.color);
        ellipse(this.location.x, this.location.y, this.radius, this.radius);
    }

}


class Paddle {
    constructor() {
        this.width = 100;
        this.height = 20;
        this.color = color(255);
        this.location = createVector(width/2 - this.width/2, height-35);
    }

    setColor(inputColor){
        this.color = inputColor;
    }

    draw() {
        fill(this.color);
        rect(this.location.x, this.location.y, this.width, this.height);
    }

}

class Block {

    
}


