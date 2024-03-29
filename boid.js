class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.accelaration = createVector();
        this.maxForce = 100;
    }



    align(boids) {

        let groupRadius = 100;
        let avgSterring = createVector();
        let counter = 0;

        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            avgSterring.add(dist);

            if (other != this && d < groupRadius) {
                avgSterring.add(other.velocity);
                counter++;
            };
        };

        if (counter > 0) {
            avgSterring.div(counter);
            avgSterring.sub(this.velocity);
            
            console.log(avgSterring);
        }
        return avgSterring;
    }

    startFlock(boids) {
        let alignment = this.align(boids);
        this.accelaration = alignment;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.accelaration);
    }

    show() {
        strokeWeight(10);
        stroke(255);
        point(this.position.x, this.position.y);
    }
}