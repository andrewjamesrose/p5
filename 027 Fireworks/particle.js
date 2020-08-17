/// <reference path= "../zzTSDefinitions/p5.global-mode.d.ts" />


function Particle(x,y, starburstColor, particleSat, parentFirework){
    this.pos = createVector(x, y);
    this.lifespan= random(150,360);
    this.starburstColor = starburstColor;
    this.particleSaturation = particleSat;
    
    if(parentFirework){
        this.vel = createVector(0,random(-6.5,-7.9));
    } else {
        this.vel = p5.Vector.random2D().mult(random(1,3));
        //createVector(random(-1,1),random(-1,1));
    }
    
    this.acc = createVector(0,0);

    this.update = function(force){
        if(!parentFirework){
            //decelerate the particles
            this.vel.mult(0.99);
            this.lifespan -=4;
        }
        this.acc.add(force);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.show = function(){
        if(!parentFirework){
            strokeWeight(2);
            stroke(this.starburstColor,this.particleSaturation, 100, this.lifespan/255);
            //stroke(parentColour, 255, this.lifespan);
        } else {
            strokeWeight(3);
            stroke(255,0,100, this.pos.y/(height*1.5));
            //stroke(255,255*this.pos.y/(height*2))
        }
        
        point(this.pos.x, this.pos.y);

    }

    this.done = function(){
        if (this.lifespan<0){
            return true;
        } else{
            return false;
        }
    }
}