
var theCanvas = document.getElementById("gameCanvas");
var ctx = theCanvas.getContext("2d");

//square
ctx.beginPath();
ctx.fillStyle = "rgb(95, 233, 175)";
ctx.rect(200, 50, 500, 490);
ctx.fill();
ctx.stroke();

//red hippo
var img_red_hippo = document.getElementById("redHippo");
img_red_hippo.onload = () => {
    ctx.drawImage(img_red_hippo, -110, 220, 560, 470);
}

// blue hippo
var img_blue_hippo = document.getElementById("blueHippo");
img_blue_hippo.onload = () => {
    ctx.drawImage(img_blue_hippo, -100, -112, 560, 470);
}

//green hippo
var img_green_hippo = document.getElementById("greenHippo");
img_green_hippo.onload = () => {
    ctx.drawImage(img_green_hippo, 510, 228, 460, 470);
}

//yellow hippo
var img_yellow_hippo = document.getElementById("yellowHippo");
img_yellow_hippo.onload = () => {
    ctx.drawImage(img_yellow_hippo, 510, -92, 460, 470);
}

//balls
var img_balls = document.getElementById("balls");
img_balls.onload = () => {
    ctx.drawImage(img_balls, 450, 215, 40, 40);

    ctx.drawImage(img_balls, 350, 250, 40, 40);
    ctx.drawImage(img_balls, 390, 250, 40, 40);
    ctx.drawImage(img_balls, 430, 250, 40, 40);
    ctx.drawImage(img_balls, 470, 250, 40, 40);
    ctx.drawImage(img_balls, 510, 250, 40, 40);
    ctx.drawImage(img_balls, 550, 250, 40, 40);

    ctx.drawImage(img_balls, 350, 290, 40, 40);
    ctx.drawImage(img_balls, 390, 290, 40, 40);
    ctx.drawImage(img_balls, 430, 290, 40, 40);
    ctx.drawImage(img_balls, 470, 290, 40, 40);
    ctx.drawImage(img_balls, 510, 290, 40, 40);
    ctx.drawImage(img_balls, 550, 290, 40, 40);

    ctx.drawImage(img_balls, 350, 330, 40, 40);
    ctx.drawImage(img_balls, 390, 330, 40, 40);
    ctx.drawImage(img_balls, 430, 330, 40, 40);
    ctx.drawImage(img_balls, 470, 330, 40, 40);
    ctx.drawImage(img_balls, 510, 330, 40, 40);
    ctx.drawImage(img_balls, 550, 330, 40, 40);

    ctx.drawImage(img_balls, 450, 365, 40, 40);
}

function moveUpClicked() {

}

window.addEventListener("keydown",checkKeyPress,false);

function checkKeyPress(key){
    if(key.keyCode == "81"){//Q PLAYER 1
        alert("The Q HAS BEEN PRESSED")
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