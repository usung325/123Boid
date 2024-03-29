// import Boid from "./boid";
const flock = [];

let alignSlider, cohesionSlider, separationSlider;

let qt;

function setup() {
  createCanvas(1400, 800);

  // BOID
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);
  for (let i = 0; i < 300; i++) {
    flock.push(new Boid());
  }
  // BOID

  let boundary = new Rectangle(width/2, height/2, width/2, height/2);
  qt = new Quadtree(boundary, 4);
  console.log(qt);

  for (let i = 0; i < 500; i++) {
    let p = new Point(random(width), random(height));
    qt.insert(p);
  }
}

function draw(){
  background(0);

  // BOID
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }

  //BOID



  qt.show();
  let range = new Rectangle(mouseX, mouseY, 100, 100);
  rect(range.x, range.y, range.w * 2, range.h * 2);
  let points =  qt.query(range);

  for (let p of points){
    strokeWeight(10);
    point(p.x, p.y);
  }
}



