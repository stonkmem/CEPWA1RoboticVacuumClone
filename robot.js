class Robot {
  constructor(){
    this.sprite = new Sprite(width/2,height/2,50,50)
    this.pos = this.sprite.position
    this.angle = 3/2*PI+PI/14;
    this.r = 50/2
    this.vel = createVector(0,0);
    this.maxSpeed = 1.5
    this.trail = [];
    this.COOLDOWN=0;
    this.prevX = [0, 0, 0, 0];
    this.prevY = [0, 0, 0, 0];
  }
  
  insideMap(){
    if (this.pos.x > width - this.r) {
      this.pos.x = width - this.r;
    }
    if (this.pos.x < this.r) {
      this.pos.x = this.r;
    }
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
    }
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
    } 
  }
  
  marandom(){
    return Math.random()*0.75+0.05;
  }

  update(){
    this.insideMap();
    this.vel.limit(this.maxSpeed);
    this.vel.setMag(100);
    this.vel = p5.Vector.fromAngle(this.angle);
    this.pos.add(this.vel);
    if(frameCount % 5 == 0){
      this.trail.push({x: this.pos.x , y: this.pos.y});
    }
    this.sprite.rotate = this.angle/PI * 180;
    // if(frameCount % 250 == 0){
    //    this.angle = random(0,2*PI);
    // }
    while(this.angle>2*PI)this.angle-=2*PI;
    this.prevX[frameCount%4] = this.pos.x;
    this.prevY[frameCount%4] = this.pos.y;
    if(frameCount>4&&frameCount-this.COOLDOWN>5){
      for(let i=0; i<4; i+=1){
        for(let j=i+1; j<4; j+=1){
          if(this.prevX[i]==this.prevX[j]){
            this.COOLDOWN=frameCount;
            console.log(this.angle/PI);
            if(this.vel.x>0){
              if(this.angle<PI){
                this.angle = PI*(this.marandom()/2+0.5);
              }
              else this.angle = PI*(this.marandom()/2+1);
            }
            else{
              if(this.angle<PI){
                this.angle = PI*(this.marandom()/2);
                
              }
              else{ this.angle = PI*(this.marandom()/2+1.5);console.log("CHECK");}
            }
          }
          else if(this.prevY[i]==this.prevY[j]){
            this.COOLDOWN = frameCount;
            if(this.vel.y>0){
              if(this.angle>1/2*PI){
                this.angle = PI*(this.marandom()/2+1);
              }
              else{
                this.angle = PI*(this.marandom()/2+1.5);
              }
            }
            else{
              if(this.angle<PI*3/2){
                this.angle = PI * (0.5 + this.marandom()/2);
              }
              else this.angle = PI*(this.marandom()/2);
            }
          }
        }
      }
    }
    
  }
  
  
  drawRobot(){
    this.drawTrail()
    
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    fill(0);
    circle(0, 0, this.r * 2);
    push()
    noStroke()
    fill('lightblue')
    circle(0,0,this.r * 2 -10)
    pop()
    rectMode(CENTER)
    rect(15,0,3,30)
    pop();
    
  }
  
  drawTrail(){
    for (let trail of this.trail) {
      noStroke();
      fill(255);
      circle(trail.x, trail.y, this.r * 2 - 10);
    }
  }
}

class FloorPlan {
    constructor(){
      this.obstacles = [];
      this.itemsTotalSize = 0;
    }
    
    createObstacles(){
      let light = new Sprite(width-50, height - 50, 100, 100);
      light.shapeColor = color(165, 42, 42);
      this.itemsTotalSize += 100*100;
    
      let light2 = new Sprite(width-50, 50, 100, 100);
      light2.shapeColor = color(165, 42, 42);
      this.itemsTotalSize += 100*100;
      
      this.obstacles.push(light);
      this.obstacles.push(light2);
      
    }
    
    update(robot){
      for (let obstacle of this.obstacles){
        robot.sprite.collide(obstacle);
        drawSprite(obstacle);
      }
    }

    wallifier(){
      // let walls=[];
      // for(let obstacle of this.obstacles){
        // walls.push([obstacle.position.x - obstacle.w/2, obstacle.position.y - obstacle.h/2, 
                    // obstacle.position.x + obstacle.w/2, obstacle.position.y - obstacle.h/2, 
                    // obstacle.position.x - obstacle.w/2, obstacle.position.y + obstacle.h/2, 
                    // obstacle.position.x + obstacle.w/2, obstacle.position.y + obstacle.h/2]);
      // }
      return this.obstacles;
    }
}