class Ball {
    constructor(){
        this.color = color(255);
        this.diameter = 20;
        this.radius=this.diameter/2;
        this.location = createVector(width/2, height/2);
        this.velocity = createVector(0, 0);
        this.inactive = true;
        const speedBall = 3;
    }

    setColor(ballColor){
        this.color = ballColor;
    }

    draw(){
        fill(this.color);
        ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
    }

    activate(){
        this.inactive=false;
        this.velocity.set(3,-3);
    }

    update(){
        this.location.add(this.velocity);
        //check each edge in turn
        
        //top edge
            if((this.location.y - this.radius) <= 0){ 
                this.velocity.mult(1,-1)
                this.update()
            }

        //right edge
        if((this.location.x + this.radius) >= width){ 
            this.velocity.mult(-1,1)
            this.update()
        }
        //left edge

        if((this.location.x - this.radius) <= 0){ 
            this.velocity.mult(-1 ,1)
            this.update()
        }
        //bottom edge
        if((this.location.y + this.radius) >= height){ 
            this.velocity.mult(1,-1)
            this.update()
        }

    }
    

}


class Paddle {
    constructor() {
        this.width = 100;
        this.height = 20;
        this.color = color(255);
        this.location = createVector(width/2 - this.width/2, height-35);
        const speed = 9;
        this.speed = {
            right: createVector(speed, 0),
            left: createVector(-speed, 0)
        }
    }

    setColor(inputColor){
        this.color = inputColor;
    }

    update(direction){
        if(direction === 'right'){
            this.location.add(this.speed.right);
        } else{
            this.location.add(this.speed.left);
        }
    }

    draw() {
        fill(this.color);
        rect(this.location.x, this.location.y, this.width, this.height);
    }

}

class Block {

    constructor(posX, posY, hits){
        this.location = createVector(posX, posY);
        this.width = width/16;
        this.height = height/20;
        this.hits = hits;
        const colorMap = [  color(127,0,0), 
                            color(0,110,0), 
                            color(0,0,190)
                        ];
        this.color = colorMap[this.hits-1]
    }
  

    draw(){
        fill(this.color);
        rect(this.location.x, this.location.y, this.width, this.height);       
    }
    
    impact(){
        
    }

}


