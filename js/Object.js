class Square {
  constructor(config) {
    this.sprite = new Sprite({
      squareObject: this,
    });

    // this.gameObjects = config.gameObjects;
    // this.isMounted = false;
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;

    this.movingProgressRemaining = 0;
    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  mount(map) {
    console.log("mounting!");
    // this.isMounted = true;
    map.addWall(this.x, this.y);
  }

  update(state) {
    // console.log(this.movingProgressRemaining);
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      //More cases for starting to walk will come here
      //
      //

      //Case: We're keyboard ready and have an arrow pressed
      if (this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }
      this.updateSprite(state);
    }
  }

  startBehavior(state, behavior) {
    // set character direction to whatever behavior has
    this.direction = behavior.direction;

    if (behavior.type === "walk") {
      // stop here  if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }

      // Ready to walk!
      state.map.moveWall(this.x, this.y, this.direction)
      this.movingProgressRemaining = 32;
    }
  }

  updatePosition() {
    // console.log(this.direction);
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movingProgressRemaining -= 1;
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle");
  }
}

class Circle {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.fillStyle = config.fillStyle;
    this.radius = config.radius;
  }

  drawCircle(ctx) {
    ctx.fillStyle = this.fillStyle;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Triangle {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.fillStyle = config.fillStyle;
    this.size = config.size;
  }

  drawTriangle(ctx) {
    ctx.fillStyle = this.fillStyle;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.size, this.y);
    ctx.lineTo(this.x + this.size / 2, this.y + this.size);
    ctx.closePath();
    ctx.fill();
  }
}
