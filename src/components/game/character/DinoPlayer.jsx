class DinoPlayer {
  score = 0;
  highScore = 0;
  scoreText;
  highScoreText;
  player = "";
  gravity = "";
  obstacles = null;
  gameSpeed = 0;
  keys = [];
  jumpCount = 0;
  jumpPossible = false;

  constructor(
    ctx,
    x,
    y,
    width,
    height,
    dinoTrex,
    cactus,
    canvasWidth,
    canvasHeight,
    collisionState
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.cactus = cactus;
    this.ctx = ctx;
    this.dinoTrex = dinoTrex;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.collisionState = collisionState;

    this.directionY = 0;
    this.jumpForce = 15;
    this.originalHeight = height;
  }

  draw() {
    this.dinoTrex.draw();
  }

  start() {
    this.dinoTrex.draw();
    this.startListening();
  }

  startListening() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("jump", this.onFaceEmotionJump.bind(this));
  }

  onKeyDown(e) {
    if (e.code === "Space") {
      this.jumpCount += 1;
      this.jumpPossible = true;

      if (this.jumpCount > 2 || this.dinoTrex.y === 0) {
        this.jumpPossible = false;
        this.jumpCount = 0;
      }

      if (this.dinoTrex.y === 200) {
        this.jumpPossible = true;
        this.jumpCount = 0;
      }

      if (
        (this.jumpCount >= 0 && this.jumpCount < 2 && this.jumpPossible) ||
        this.dinoTrex.y === 200
      ) {
        this.dinoTrex.jumpState = !this.dinoTrex.jumpState;
        this.dinoTrex.jump();
      }
    }
  }

  onFaceEmotionJump() {
    this.jumpCount += 1;
    this.jumpPossible = true;

    if (this.jumpCount > 2 || this.dinoTrex.y === 0) {
      this.jumpPossible = false;
      this.jumpCount = 0;
    }

    if (this.dinoTrex.y === 200) {
      this.jumpPossible = true;
      this.jumpCount = 0;
    }

    if (
      (this.jumpCount >= 0 && this.jumpCount < 2 && this.jumpPossible) ||
      this.dinoTrex.y === 200
    ) {
      this.dinoTrex.jumpState = !this.dinoTrex.jumpState;
      this.dinoTrex.jump();
    }
  }
}

export default DinoPlayer;
