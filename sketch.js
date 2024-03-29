// import Boid from "./boid";
const flock = [];

function setup() {
  createCanvas(400, 400);

  let boundary = new Rectangle(200, 200, 200, 200);
  let qt = new Quadtree(boundary, 4);
  console.log(qt);

  for (let i = 0; i < 500; i++) {
    let p = new Point(random(width), random(height));
    qt.insert(p);
  }
  background(0);
  qt.show();
}

