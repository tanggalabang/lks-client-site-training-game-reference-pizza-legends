class Sprite {
  constructor(config) {
    this.squareObject = config.squareObject;

    this.colorMove = config.colorMove || {
      idle: "black",
      "walk-up": "red",
      "walk-right": "yellow",
      "walk-down": "green",
      "walk-left": "blue",
    };
    this.currentAnimation = "idle";
  }

  get frame() {
    return this.colorMove[this.currentAnimation];
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
    }
  }

  draw(ctx, cameraPerson) {
    ctx.fillStyle = this.frame;
    ctx.beginPath();
    ctx.rect(
      this.squareObject.x + utils.withGrid(4.5) - cameraPerson.x,
      this.squareObject.y + utils.withGrid(4.5) - cameraPerson.y,
      this.squareObject.width,
      this.squareObject.height
    );
    ctx.fill();

    // this.updateAnimationProgress();
  }
}
