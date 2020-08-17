/// <reference path= "../zzTSDefinitions/p5.global-mode.d.ts" />

function Firework(burstColor){
    this.firework = new Particle(random(width), height,  burstColor, 0, true);
    this.firework.burstColor = burstColor;
    this.firework.exploded = false;
    this.firework.starburst =[];
   

    this.update = function(force) { 
        if (!this.firework.exploded){
            this.firework.update(force);
            if (this.firework.vel.y >=0) {
                this.firework.exploded = true;
               // background(180);
                this.detonate();
            }
        }
        for (let i =0; i<this.firework.starburst.length; i++){
            this.firework.starburst[i].update(force);
        }
    }

    this.detonate = function(){
        for (let i =0; i<150;i++){
            let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.firework.burstColor, random(0,100), false);
            this.firework.starburst.push(p);
        }

    }

    this.show = function(){
        if (!this.firework.exploded){
            this.firework.show();
        }
        for (let i =this.firework.starburst.length-1 ; i>=0; i--){
            this.firework.starburst[i].show();
            if (this.firework.starburst[i].done()){
                this.firework.starburst.splice(i,1);
            } 
        }
    }

    this.done = function(){
        if (this.firework.exploded && this.firework.starburst.length==0){
            return true;
        } else{
            return false;
        }
    }

}