// import Boid from "./boid";
const flock = [];
let qt;

function setup() {
  createCanvas(400, 400);

  let boundary = new Rectangle(200, 200, 200, 200);
  qt = new Quadtree(boundary, 4);
  console.log(qt);

  for (let i = 0; i < 500; i++) {
    let p = new Point(random(width), random(height));
    qt.insert(p);
  }
}

function draw(){
  background(0);
  qt.show();
  let range = new Rectangle(mouseX, mouseY, 100, 100);
  rect(range.x, range.y, range.w * 2, range.h * 2);
  let points =  qt.query(range);

  for (let p of points){
    strokeWeight(10);
    point(p.x, p.y);
  }
}

