window.onload = () => {
    // 'global' vars
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const playArea = {startx: 200, starty: 50, x: 500, y:490}
    const colors = {background: "rgb(102, 204, 255)", playArea: "rgb(95, 233, 175)"}
    let balls = new Array();
    let hippos = new Array();

    // initialization functions
    const initHippos = () => {
        let redHippoData = {
            img: document.getElementById("redHippo"),
            xpos: -110,
            ypos: 220,
            xlen: 560,
            ylen: 470
        };
        let blueHippoData = {
            img: document.getElementById("blueHippo"),
            xpos: -100,
            ypos: -112,
            xlen: 560,
            ylen: 470
        };
        let greenHippoData = {
            img: document.getElementById("greenHippo"),
            xpos: 510,
            ypos: 228,
            xlen: 460,
            ylen: 470
        };
        let yellowHippoData = {
            img: document.getElementById("yellowHippo"),
            xpos: 510,
            ypos: -92,
            xlen: 460,
            ylen: 470
        }
        hippos.push(new Hippo(redHippoData), new Hippo(blueHippoData), new Hippo(greenHippoData), new Hippo(yellowHippoData));
    }

    const drawBackground = (ctx) => {
        ctx.fillStyle = colors.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = colors.playArea;
        ctx.rect(playArea.startx, playArea.starty, playArea.x, playArea.y);
        ctx.fill();
        ctx.stroke();
    }

    // game steps
    const update = () => {
        hippos.forEach((hippo) => {
            hippo.update();
        })
    }

    const draw = () => {
        drawBackground(ctx);
        hippos.forEach((hippo) => {
            hippo.draw(ctx);
        });
    }

    // game loop
    const run = () => {
        window.setInterval(() => {
            update();
            draw();
        }, 40) //25 fps
    }

    // inital code
    let keyData = [{keyCode: 81, action: () => {alert("THE Q KEY HAS BEEN PRESSED");}}];
    KeyDetection.init();
    KeyDetection.addKeyData(keyData);
    initHippos();
    draw();
}