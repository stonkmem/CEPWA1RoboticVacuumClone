class Robot {
    constructor(){
      this.sprite = new Sprite(25,25,50,50);
      this.pos = this.sprite.position;
      this.angle = 0;
      this.r = 50/2;
      this.vel = createVector(0,0);
      this.maxSpeed = 1.5;
      this.trail = [];
      this.state = 1;
      this.collF=false
      this.collL=false
      this.collR=false
      this.collB=false;
      for(let i=25; i<600; i+=50){
        let arr = [];
        for(let j=25; j<800; j+=50){
          arr.push(false);
        }
      }
      this.trail[0][0]=
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
    
    update(){
      //CONSECRATED
      this.insideMap();this.vel.limit(this.maxSpeed);this.vel = p5.Vector.fromAngle(this.angle);this.pos.add(this.vel);if(frameCount % 5 == 0){this.trail.push({x: this.pos.x , y: this.pos.y});}this.sprite.rotate = this.angle/PI * 180;
      //CONSECRATED
      
    }
    
    nav(wallist){
      push();
      rotate(this.angle);
      translate(this.pos.x, this.pos.y);
      let FSprite = new Sprite(this.position.x+50, this.position.y, 50, 50);
      for(let walll in wallist){
        if(FSprite.overlap(walll)){
          this.collF=true;
        }
      }
      Fsprite.position.add(createVector(-100, 0)); //Move FSprite to back
      for(let walll in wallist){
        if(FSprite.overlap(walll)){
          this.collB=true;
        }
      }
      Fsprite.position.add(createVector(50, 50)); //Move FSprite to back
      for(let walll in wallist){
        if(FSprite.overlap(walll)){
          this.collR=true;
        }
      }
      Fsprite.position.add(createVector(0, -100)); //Move FSprite to back
      for(let walll in wallist){
        if(FSprite.overlap(walll)){
          this.collL=true;
        }
      }
      pop();
    }
    
    drawRobot(){
      this.drawTrail()
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      fill(0);
      circle(0, 0, this.r * 2);
      push();
      noStroke()
      fill('lightblue')
      circle(0,0,this.r * 2 -10)
      pop();
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

class Ray {
  constructor(x, y, angle) {
      this.pos = createVector(x, y); // Starting position
      this.dir = p5.Vector.fromAngle(radians(angle)); // Direction vector
  }

  // Display the ray
  show() {
      stroke(0); // Set stroke color to black
      push();
      translate(this.pos.x, this.pos.y);
      line(0, 0, this.dir.x * 10, this.dir.y * 10); // Adjust line length as needed
      pop();
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
      this.itemsTotalSize += 100*100
      
      this.obstacles.push(light)
      this.obstacles.push(light2)
      
    }
    
    update(robot){
      for (let obstacle of this.obstacles){
        robot.sprite.collide(obstacle)
        drawSprite(obstacle)
      }
    }

    wallifier(){
      let walls=[];
      for(let obstacle of this.obstacles){
        walls.push([obstacle.position.x - obstacle.w/2, obstacle.position.y - obstacle.h/2, 
                    obstacle.position.x + obstacle.w/2, obstacle.position.y - obstacle.h/2, 
                    obstacle.position.x - obstacle.w/2, obstacle.position.y + obstacle.h/2, 
                    obstacle.position.x + obstacle.w/2, obstacle.position.y + obstacle.h/2]);
      }
      return walls;
    }
}