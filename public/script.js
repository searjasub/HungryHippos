window.onload = () => {
    const theCanvas = document.getElementById("gameCanvas");
    window.ctx = theCanvas.getContext("2d");
    var balls = new Array();
    const img_red_hippo = document.getElementById("redHippo");
    const img_blue_hippo = document.getElementById("blueHippo");
    const img_green_hippo = document.getElementById("greenHippo");
    const img_yellow_hippo = document.getElementById("yellowHippo");
    const playArea = {startx: 200, starty: 50, x: 500, y:490}
    //square

    const drawWindow = () => {
        window.ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, theCanvas.width, theCanvas.height);
        window.ctx.beginPath();
        window.ctx.fillStyle = "rgb(95, 233, 175)";
        window.ctx.rect(playArea.startx, playArea.starty, playArea.x, playArea.y);
        window.ctx.fill();
        window.ctx.stroke();
        window.ctx.drawImage(img_red_hippo, -110, 220, 560, 470);
        window.ctx.drawImage(img_blue_hippo, -100, -112, 560, 470);
        window.ctx.drawImage(img_green_hippo, 510, 228, 460, 470);
        window.ctx.drawImage(img_yellow_hippo, 510, -92, 460, 470);
    }
    
    // //red hippo
    // img_red_hippo.onload = () => {
    // }
    
    // // blue hippo
    // img_blue_hippo.onload = () => {
    // }
    
    // //green hippo
    // img_green_hippo.onload = () => {
    // }
    
    // //yellow hippo
    // img_yellow_hippo.onload = () => {
    // }
    
    var run = () => {
        for (let i = 0; i < 10; i++) {
            let data = {x:Math.random()*playArea.x+playArea.startx,y:Math.random()*playArea.y+playArea.starty,speed:Math.random()*20,angle:Math.random()*2};
            balls.push(new Ball(data));
        }
        if (run) {
            setInterval(updateLoop, 40);
        }
    }
    
    var updateLoop = () => {
        drawWindow();
        console.log(balls[0].x);
        console.log(balls[0].y);
        balls.forEach((ball) => {
            ball.collisionDetection(balls);
            ball.update();
            ball.draw();
            ball.clearCollide();
        });

    }
    
    
    
    
    
    window.addEventListener("keydown",checkKeyPress,false);
    
    function checkKeyPress(key){
        if(key.keyCode == "81"){//Q PLAYER 1
            run();
        }
        if(key.keyCode == "67"){//C PLAYER 2
            alert("The C HAS BEEN PRESSED")
        }
        if(key.keyCode == "77"){//M PLAYER 3
            alert("The M HAS BEEN PRESSED")
        }
        if(key.keyCode == "80"){//P PLayer 4
            alert("The P HAS BEEN PRESSED")
        }
    }

    var img_balls = document.getElementById("balls");

    class Ball {
        constructor(data) {
            this.x = data.x;
            this.y = data.y;
            this.speed = data.speed;
            this.angle = data.angle;
            this.radius = 20;
            this.collidedwith = [];
        }

        tryCollide(ball) {
            let xdist = Math.pow((this.x-ball.x), 2);
            let ydist = Math.pow((this.y-ball.y), 2);
            let dist = Math.sqrt(xdist, ydist);
            if (dist < this.radius + ball.radius) {
                if (!this.collidedwith.includes(ball)) {
                    this.bounceOffBall(ball);
                }
            }
        }
        bounceOffWall() {
            this.angle = (this.angle + 0.5);
            this.checkAngle();
        }
        bounceOffBall(ball) {
            let _speed = this.speed;
            this.speed = ball.speed;
            ball.speed = _speed;
            this.angle = (this.angle + Math.random()*2);
            this.checkAngle();
            ball.angle = (ball.angle + Math.random()*2);
            ball.checkAngle();
            this.collidedwith.push(ball);
            ball.collidedwith.push(ball);
        }

        clearCollide() {
            this.collidedwith = [];
        }

        update() {
            this.x = this.x + Math.sin(this.angle) * this.speed;
            this.y = this.y +  Math.cos(this.angle) * this.speed;
        }

        draw() {
            console.log("DRAW");
            window.ctx.drawImage(img_balls, this.x, this.y, this.radius*2, this.radius*2);
        }

        checkAngle() {
            while (this.angle >= 2.0) {
                this.angle -= 2.0;
            }
        }

        collisionDetection (balls) {
            balls.forEach((b) => {
                this.tryCollide(b);
            })
            if (this.x >= playArea.startx + playArea.x || this.x <= playArea.startx) {
                this.bounceOffWall();
            }
            if (this.y >= playArea.starty + playArea.y || this.y <= playArea.starty) {
                this.bounceOffWall();
            }
            if (this.x >= playArea.startx + playArea.x + 50 || this.x < -50 || this.y >= playArea.starty + playArea.y || this.y < -50) {
                balls.splice(balls.indexOf(this), 1);
            }
        }

    }


}
