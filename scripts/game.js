
var theCanvas = document.getElementById("gameCanvas");
var ctx = theCanvas.getContext("2d");

//circle
ctx.beginPath();
ctx.fillStyle = "rgb(95, 233, 175)";
ctx.arc(445, 300, 300, 0, 2 * Math.PI, true);
ctx.fill();
ctx.stroke();

//red hippo
var img_red_hippo = document.getElementById("redHippo");
ctx.drawImage(img_red_hippo, -110, 220, 560, 470);

// blue hippo
var img_blue_hippo = document.getElementById("blueHippo");
ctx.drawImage(img_blue_hippo, -110, -100, 560, 470);

//green hippo
var img_green_hippo = document.getElementById("greenHippo");
ctx.drawImage(img_green_hippo, 520, 220, 460, 470);

//yellow hippo
var img_yellow_hippo = document.getElementById("yellowHippo");
ctx.drawImage(img_yellow_hippo, 520, -90, 460, 470);

//balls
var img_balls = document.getElementById("balls");
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