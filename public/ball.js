class Ball {
    static speedLimit = 10;
    constructor (data) {
        
        this.pos = data.pos;
        this.vel = data.vel;
        this.radius = data.radius;
        this.img = data.img;
        this.collidedwith = [];
    }

    update(balls) {
        balls.forEach((ball) => {
            if (this.findDistance(ball) <= this.radius + ball.radius) {
                if (this.collidedwith.includes(ball)) {

                } else {
                    this.doCollision(ball);
                }
            }
        });
        this.checkWallCollision();
        this.enforceSpeedLimit();
        this.move();
        this.collidedwith = [];
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }

    move() {
        this.pos.x = parseFloat(this.pos.x + this.vel.x);
        this.pos.y += this.vel.y;
    }

    enforceSpeedLimit() {
        if (this.vel.x > Ball.speedLimit) {
            this.vel.x = Ball.speedLimit;
        } else if (this.vel.x < -Ball.speedLimit) {
            this.vel.x = -Ball.speedLimit;
        }

        if (this.vel.y > Ball.speedLimit) {
            this.vel.y = Ball.speedLimit;
        } else if (this.vel.y < -Ball.speedLimit) {
            this.vel.y = -Ball.speedLimit;
        }

    }

    checkWallCollision() {
        if (this.pos.x >= 680 - this.radius || this.pos.x <= 180 + this.radius) {
            this.bouceOffWall(true);
        } else if (this.pos.y >= 510 - this.radius || this.pos.y <= 40 + this.radius) {
            this.bouceOffWall(false);
        }
    }

    // crazy math stuff to get collisions working
    
    // find distance between this ball and another
    findDistance(ball) {
        let xc = Math.pow((this.pos.x - ball.pos.x), 2); // x-component
        let yc = Math.pow((this.pos.y - ball.pos.y), 2); // y-component
        let distance = Math.sqrt(xc + yc);
        return distance;
    }

    // rotate the coordinate plane to use 
    // One dimension newtonian equasion (OdNe)
    // did someone call for matricies tranformations?

    rotate(vel, angle) {
        const rotatedVelocities = new Vector(vel.x * Math.cos(angle) - vel.y * Math.sin(angle), vel.x * Math.sin(angle) + vel.y * Math.cos(angle));
        return rotatedVelocities;
    }

    // bounces off a wall, or any other object with 'infinate' mass
    bouceOffWall(vertical) {
        if (vertical) {
            this.vel.x *= -1;
        } else {
            this.vel.y *= -1;
        }
    }

    // resolves a collision between this ball and another.
    doCollision(ball) {
        
        // prevents balls from getting stuck together 
        const vxDiff = this.vel.x - ball.vel.x;
        const vyDiff = this.vel.y - ball.vel.y;

        const pxDiff = ball.pos.x - this.pos.x;
        const pyDiff = ball.pos.y - this.pos.y;

        if (vxDiff * pxDiff + vyDiff * pyDiff >= 0) { //means they won't get stuck together


            // get collision angle
            const angle = -Math.atan2(ball.pos.y - this.pos.y, ball.pos.x - this.pos.x);

            // velocity before equation
            const u1 = this.rotate(this.vel, angle);
            const u2 = this.rotate(ball.vel, angle);

            // velocity after (OdNe)
            const v1 = new Vector(u2.x, u1.y);
            const v2 = new Vector(u1.x, u2.y);

            // rotate back
            const vf1 = this.rotate(v1, -angle);
            const vf2 = this.rotate(v2, -angle);

            // apply new velocities
            this.vel = vf1;
            ball.bel = vf2;
            // this.vel.x = vf1.x;
            // this.vel.y = vf1.y;
            // ball.vel.x = vf2.x;
            // ball.vel.y = vf2.y;

            ball.collidedwith.push(ball);
        } else {
            // basically just wait till they won't get stuck
        }
    }
}