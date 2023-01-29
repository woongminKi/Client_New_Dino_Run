class Cactus {
  constructor(ctx, image) {
    this.x = 1000;
    this.y = 200;
    this.width = 50;
    this.height = 50;
    this.ctx = ctx;
    this.image = image;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Cactus;
