class Hippo {
    
    constructor(data) {
        this.img = data.img;
        this.xpos = data.xpos;
        this.ypos = data.ypos;
        this.xlen = data.xlen;
        this.ylen = data.ylen;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.xpos, this.ypos, this.xlen, this.ylen);
    }

    update() {
        
    }
}
