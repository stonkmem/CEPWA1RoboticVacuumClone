class Robot {
    constructor(){
      this.sprite = new Sprite(26,26,50,50);
      this.pos = this.sprite.position;
      this.angle = 0;
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
      this.sought=false;
      this.imageJ=0;
      this.seek = createVector(0, 1);
      for(let i=-25; i<=825; i+=50){
        let arr = [];
        for(let j=-25; j<=625; j+=50){
          if(j==-25 || j==625 || i==-25 || i==825){
            arr.push(true);
          }
          else arr.push(false);
        }
        this.bitset.push(arr);
      }
      this.bitset[1][1]=true;
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
    
    update(wallist){
      //CONSECRATED
      this.insideMap();
      this.vel = p5.Vector.fromAngle(this.angle);
      this.vel = createVector(Math.round(this.vel.x), Math.round(this.vel.y));
      this.vel.limit(this.maxSpeed);
      strokeWeight(3);point(this.seek);
      // console.log(this.seek);
      this.pos.add(this.vel);
      this.pos = createVector(Math.round(this.pos.x), Math.round(this.pos.y));
      if(frameCount % 5 == 0){this.trail.push({x: this.pos.x , y: this.pos.y});}
      // this.sprite.rotate = this.angle/PI * 180;
      //CONSECRATED
      this.coords=this.coordToMap(this.pos.x, this.pos.y);
      if(this.sought===false || this.seek == this.pos || frameCount-this.imageJ>49){
        this.nav(wallist);
        console.log(this.pos);
      }
    }

    colll(vv, spr){
      let vvcorners=[vv.x-25, vv.x+25, vv.y-25, vv.y+25];
      strokeWeight(3);
      rect(vvcorners[0], vvcorners[2], 50, 50);
      point(vvcorners[0], vvcorners[2]);
      point(vvcorners[0], vvcorners[3]);
      point(vvcorners[1], vvcorners[2]);
      point(vvcorners[1], vvcorners[3]);
      let sprcorners=[spr.position.x - spr.width/2, spr.position.x  +spr.width/2, spr.position.y - spr.height/2, spr.position.y + spr.height/2]
      if((vvcorners[0]>=sprcorners[1] || vvcorners[1]<=sprcorners[0])||(vvcorners[2]>=sprcorners[3] || vvcorners[3]<=sprcorners[2])){
        return false;
      }
      else return true;
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

      this.FSprite.pos = p5.Vector.add(this.pos, createVector(50, 0).rotate(this.angle));
      for(let walll of wallist){
        if(this.colll(this.FSprite.pos, (walll))){
          this.collF=true;
        }
      }


      this.FSprite.pos = p5.Vector.add(this.pos, createVector(-50, 0).rotate(this.angle));
      for(let walll of wallist){
        if(this.colll(this.FSprite.pos, (walll))){
          this.collB=true;
        }
      }

      this.FSprite.pos = p5.Vector.add(this.pos, createVector(0, 50).rotate(this.angle));
      for(let walll of wallist){
        if(this.colll(this.FSprite.pos, (walll))){
          this.collR=true;
        }
      }

      this.FSprite.pos = p5.Vector.add(this.pos, createVector(0, -50).rotate(this.angle));
      for(let walll of wallist){
        if(this.colll(this.FSprite.pos, (walll))){
          this.collL=true;
        }
      }

      strokeWeight(10);point(this.FSprite.pos);
      this.angle+=2*PI;console.log(this.bitset[this.coords.x][this.coords.y-1]);
      if(!this.collL && !this.bitset[this.coords.x][this.coords.y-1]){//
        this.angle-=PI/2;
      }
      else if(!this.collF && !this.bitset[this.coords.x+1][this.coords.y]){}//
      else if(!this.collR && !this.bitset[this.coords.x][this.coords.y+1]){//
        this.angle+=PI/2;
      }
      else{this.angle+=PI;}
      this.seek = this.mapToCoord(this.coords.x+1, this.coords.y);this.sought=true;this.imageJ=frameCount;
      this.bitset[this.coordToMap(this.pos.x, this.pos.y).x][this.coordToMap(this.pos.x, this.pos.y).y]=true;
    }
    
    coordToMap(xx, yy){
      return createVector(Math.floor(0.05+(xx-25)/50)+1, Math.floor(0.05+(yy-25)/50)+1);
    }

    mapToCoord(xx, yy){
      return createVector((xx-1)*50+25, (yy-1)*50+25)
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