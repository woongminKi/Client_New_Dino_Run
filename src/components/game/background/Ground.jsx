class Ground {
  constructor(ctx, image, width) {
    this.x = 12;
    this.y = 210;
    this.width = width;
    this.height = 100;
    this.ctx = ctx;
    this.image = image;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Ground;
