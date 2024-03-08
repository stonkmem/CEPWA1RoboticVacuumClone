class Robot {
    constructor(){
      this.sprite = new Sprite(665,25,50,50);
      this.pos = this.sprite.position;
      this.angle = PI;
      this.r = 50/2;
      this.vel = createVector(0,0);
      this.maxSpeed = 1.5;
      this.trail = [];
      this.bitset=[];
      this.coords=createVector(0, 0);
      this.state = 1;
      this.FSprite = new Sprite(50, 0, 25, 25);
      this.collF=false;
      this.collL=false;
      this.collR=false;
      this.collB=false;
      for(let i=25; i<600; i+=50){
        let arr = [];
        for(let j=25; j<800; j+=50){
          arr.push(false);
        }
        this.bitset.push(arr);
      }
      this.bitset[0][0]=true;
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
      this.insideMap();this.vel.limit(this.maxSpeed);this.vel = p5.Vector.fromAngle(this.angle);this.pos.add(this.vel);if(frameCount % 5 == 0){this.trail.push({x: this.pos.x , y: this.pos.y});}
      // this.sprite.rotate = this.angle/PI * 180;
      //CONSECRATED
      this.coords=this.coordToMap(this.pos.x, this.pos.y);
    }
    colll(vv, spr){
      if(vv.x>=spr.position.x - spr.width/2 && vv.x<=spr.position.x  +spr.width/2 
      && vv.y>=spr.position.y - spr.height/2 && vv.y<=spr.position.y + spr.height/2){
        return true;
      }
    }
    nav(wallist){
      this.collF=false;
      this.collL=false;
      this.collR=false;
      this.collB=false;

      wallist.push(new Sprite(width/2, -5, width, 10));
      wallist.push(new Sprite(width/2, height+5, width, 10));
      wallist.push(new Sprite(-5, height/2, 10, height));
      wallist.push(new Sprite(width+5, height/2, 10, height));

      this.FSprite.pos = p5.Vector.add(this.pos, createVector(30, 0).rotate(this.angle));
      for(let walll of wallist){
        if(this.colll(this.FSprite.pos, (walll))){
          this.collF=true;
        }
      }


      this.FSprite.pos = p5.Vector.add(this.pos, createVector(-30, 0).rotate(this.angle));
      for(let walll of wallist){
        if(this.colll(this.FSprite.pos, (walll))){
          this.collB=true;
        }
      }

      this.FSprite.pos = p5.Vector.add(this.pos, createVector(0, 30).rotate(this.angle));
      for(let walll of wallist){
        if(this.colll(this.FSprite.pos, (walll))){
          this.collR=true;
        }
      }

      this.FSprite.pos = p5.Vector.add(this.pos, createVector(0, -30).rotate(this.angle));
      for(let walll of wallist){
        if(this.colll(this.FSprite.pos, (walll))){
          this.collL=true;
        }
      }
      strokeWeight(10);point(this.FSprite.pos);
      // FSprite.position.add(createVector(0, -100)); //Move FSprite to back
      // for(let walll in wallist){
      //   if(this.FSprite.overlap(walll)){
      //     this.collL=true;
      //   }
      // }
      // if(!this.collF){}
      
      // console.log(this.FSprite.overlap(wallist[1]));
      this.angle+=2*PI;
      if(!this.collL){//&& !this.bitset[this.coords.x][this.coords.y-1]
        this.angle-=PI/2;
        this.vel = p5.Vector.fromAngle(this.angle, 1.5);
      }
      else if(!this.collF){}// && !this.bitset[this.coords.x+1][this.coords.y]
      else if(!this.collR ){//&& !this.bitset[this.coords.x][this.coords.y+1]
        this.angle+=PI/2;
      }
      else{this.angle+=PI;}
      console.log(this.FSprite.pos, this.collL);
    }
    
    coordToMap(xx, yy){
      return createVector(max(Math.floor((xx-25)/50), 0), max(Math.floor((yy-25)/50), 0));
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