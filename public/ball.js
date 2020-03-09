class Ball {
    constructor (data) {
        this.x = data.x;
        this.y = data.y;
        this.vx = data.vx;
        this.vy = data.vy;
        this.radius = data.radius;
        this.collidedwith = [];
    }

    findDistance(ball) {
        let xcomp = Math.pow((this.x - ball.x), 2);
        let ycomp = Math.pow((this.y - ball.y), 2);
        let distance = Math.sqrt(xcomp + ycomp);
        return distance;
    }
}