class Quadtree {
    constructor(boundary,n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }
    subdivide(){
        // this.divided = true;
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let nwBoundary = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        this.northwest = new Quadtree(nwBoundary, this.capacity);

        let neBoundary = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        this.northeast = new Quadtree(neBoundary, this.capacity);

        let swBoundary = new Rectangle(x - w/2, y + h/2, w/2, h/2);
        this.southwest = new Quadtree(swBoundary, this.capacity);

        let seBoundary = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        this.southeast = new Quadtree(seBoundary, this.capacity);
        // console.log('it should be true')
        this.divided = true;
    }

    insert(point){

        if(!this.boundary.contains(point)){
            return
        }

        if (this.points.length < this.capacity){
            this.points.push(point);
        }

        else{
            // console.log('its at least running');
            if (!this.divided){
                this.subdivide();
                
                
                
                
            }
            // console.log('insert is being called so it should subdivide')
            this.northwest.insert(point);
            this.northeast.insert(point);
            this.southwest.insert(point);
            this.southeast.insert(point);



        }
    }

    query(range, found){

        if (!found){
            found = [];
        }
        if(!this.boundary.intersects(range)){
            return
        }
        else {
            for (let p of this.points) {
                if (range.contains(p)){
                    found.push(p);
                }
            }
            if (this.divided){
                this.northwest.query(range, found);
                this.northeast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
            }

        }
        return found;
    }

    show(){
        rectMode(CENTER);
        noFill();
        strokeWeight(1);
        stroke(0,255,0);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);

        if (this.divided){
            // console.log('working')
            this.northwest.show();
            this.northeast.show();
            this.southwest.show();
            this.southeast.show();
        }
        for(let p of this.points){
            strokeWeight(4);
            point(p.x,p.y);
        }
    }
};

class Rectangle {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point){
        return(point.x > this.x - this.w &&
            point.x < this.x + this.w &&
            point.y > this.y - this.h &&
            point.y < this.y + this.h)
    }

    intersects(range){
        return (range.x - range.w < this.x - this.w || 
            range.x + range.w > this.x + this.w || 
            range.y - range.h < this.y - this.h ||
            range.y + range.h > this.y - this.h);
    }
}

class Point {
    constructor(x, y){
        this.x = x;
        this.y =y;
    }
}