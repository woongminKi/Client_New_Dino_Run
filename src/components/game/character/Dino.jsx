import Cactus from "./Cactus";

class Dino {
  requestAnimation;
  cactus = new Cactus();

  constructor(ctx, image) {
    this.x = 10;
    this.y = 200;
    this.width = 50;
    this.height = 50;
    this.ctx = ctx;
    this.image = image;
    this.jumpTime = 0;
    this.jumpState = false;
  }

  jump() {
    let animationFrameId = null;
    this.ctx.clearRect(0, 0, this.width, this.height);
    animationFrameId = requestAnimationFrame(() => this.jump());

    if (this.jumpState) {
      this.y -= 3;
      this.jumpTime += 1;
    }

    if (!this.jumpState) {
      if (this.y < 200) {
        this.y += 3;
      }
    }

    if (this.jumpTime > 50) {
      this.jumpState = false;
      this.jumpTime = 0;
    }

    if (this.y === 200) {
      cancelAnimationFrame(animationFrameId);
    }
    return { animationFrameId };
  }

  collisionCheck(obstacleItem) {
    const differenceX = obstacleItem.x - (this.x + this.width);
    const differenceY = obstacleItem.y - (this.y + this.height);

    return { differenceX, differenceY };
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Dino;
