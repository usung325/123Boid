// import Boid from "./boid";
const flock = [];

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  for(i=0; i<100; i++){
    flock.push(new Boid());
  }
}

function draw() {
  background(50);

  for (let boid of flock){
    boid.startFlock(flock);
    boid.update();
    boid.show();
  }
}