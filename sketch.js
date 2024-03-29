//'d' to rotate the robot clockwise
//'w' to move it forward

let robot;
let scoreButton;
let floorPlan;
let wall;
let TEST;
function setup() {
    createCanvas(800, 600);
    robot = new Robot()
    floorPlan = new FloorPlan()
    floorPlan.createObstacles()
    wall = floorPlan.wallifier();
    TEST  = new Sprite(width-50, 50, 25, 25);
    frameRate(60);
    scoreButton = createButton('check score')
    scoreButton.mousePressed(tabulate)
}

function draw() {
    background(100);
    for(let i=25; i<=800; i+=50){
      for(let j=25; j<=600; j+=50){
        strokeWeight(3);point(i, j);
      }
    }
    robot.drawRobot();
    robot.update(wall);
    floorPlan.update(robot);
    TEST.position = createVector(width-50+frameCount%5, 50);
    TEST.shapeColour = color(42, 165, 42);drawSprite(TEST);
    // console.log(TEST.overlap(wall[1]));
    if(frameCount == 60*60*2){createP('done!');noLoop();}
}

function tabulate() {
    // If the sketch is a graph paper, "total" variable is the number of small squares on said graph paper
    let total = width * height;
  
    loadPixels();
  
    // Refer to https://p5js.org/reference/#/p5/pixels
    // Some displays will draw multiple pixels per "small square" of graph paper. The total number of pixels used per square can be calculated using pixelDensity()
    let pixelsPerSquare = pixelDensity() * pixelDensity();
  
    // Find the number of squares that are white in colour. To do so, we find groups of 4 consecutive values in the array that equal 255 (i.e. RGBA is all 255), then divide the total number of groups by pixel density
    // We cannot directly filter the array to include items that equal 255, because alpha values for other coloured pixels will also equal 255.
    let whiteSquaresCount = 0;
  
    for (let i = 3; i <= pixels.length; i += 4) {
      if (
        pixels[i] == 255 &&
        pixels[i - 1] == 255 &&
        pixels[i - 2] == 255 &&
        pixels[i - 3] == 255
      ) {
        whiteSquaresCount += 1;
      }
    }
  
    whiteSquaresCount /= pixelsPerSquare;
  
    // Calculate percentage of squares that are white
    let score =
      str(
        round((whiteSquaresCount / (total - floorPlan.itemsTotalSize)) * 100, 2)
      ) + "% of the room is clean. Time elapsed: " + frameCount/60;
    createP(score);
}