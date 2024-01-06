class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    // base land
    this.x = config.x;
    this.y = config.y;
    this.fillStyle = config.fillStyle;
    this.width = config.width;
    this.height = config.height;

    //wall 1
    this.x1 = config.x1;
    this.y1 = config.y1;
    this.fillStyle1 = config.fillStyle1;
    this.width1 = config.width1;
    this.height1 = config.height1;

    //wall 1
    this.x2 = config.x2;
    this.y2 = config.y2;
    this.fillStyle2 = config.fillStyle2;
    this.width2 = config.width2;
    this.height2 = config.height2;
  }

  drawBackground(ctx, cameraPerson) {
    ctx.fillStyle = this.fillStyle;
    ctx.beginPath();
    ctx.rect(
      this.x + utils.withGrid(4.5) - cameraPerson.x,
      this.y + utils.withGrid(4.5) - cameraPerson.y,
      this.width,
      this.height
    );
    ctx.fill();

    //wall 1
    ctx.fillStyle = this.fillStyle1;
    ctx.beginPath();
    ctx.rect(
      this.x1 + utils.withGrid(4.5) - cameraPerson.x,
      this.y1 + utils.withGrid(4.5) - cameraPerson.y,
      this.width1,
      this.height1
    );
    ctx.fill();

    //wall 2
    ctx.fillStyle = this.fillStyle2;
    ctx.beginPath();
    ctx.rect(
      this.x2 + utils.withGrid(4.5) - cameraPerson.x,
      this.y2 + utils.withGrid(4.5) - cameraPerson.y,
      this.width2,
      this.height2
    );
    ctx.fill();
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    console.log([`${x},${y}`]);
    console.log(this.walls);
    return this.walls[`${x},${y}`] || false;
  }

  mountObject() {
    Object.values(this.gameObjects).forEach(o => {
      //TODO: determine if this object should actually mount
      o.mount(this)
    })
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

window.OverworldMaps = {
  RedMarket: {
    // base land
    x: utils.withGrid(0),
    y: utils.withGrid(0),
    fillStyle: "lightGray",
    width: utils.withGrid(10),
    height: utils.withGrid(10),

    // wall 1
    x1: utils.withGrid(2),
    y1: utils.withGrid(3),
    fillStyle1: "darkGray",
    width1: utils.withGrid(2),
    height1: utils.withGrid(3),

    // wall 2
    x2: utils.withGrid(6),
    y2: utils.withGrid(4),
    fillStyle2: "darkGray",
    width2: utils.withGrid(4),
    height2: utils.withGrid(1),

    gameObjects: {
      square1: new Square({
        isPlayerControlled: true,
        fillStyle: "green",
        x: utils.withGrid(3),
        y: utils.withGrid(6),
        width: 32,
        height: 32,
      }),
      square2: new Square({
        fillStyle: "blue",
        x: utils.withGrid(0),
        y: utils.withGrid(3),
        width: 32,
        height: 32,
      }),

      // circle1: new Circle({
      //   fillStyle: "yellow",
      //   x: 200,
      //   y: 400,
      //   radius: 50,
      // }),
      // triangle1: new Triangle({
      //   fillStyle: "orange",
      //   x: 300,
      //   y: 200,
      //   size: 100,
      // }),
    },

    walls: {
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(2, 4)]: true,
      [utils.asGridCoord(3, 4)]: true,
      [utils.asGridCoord(2, 5)]: true,
      [utils.asGridCoord(3, 5)]: true,
      [utils.asGridCoord(6, 4)]: true,
      [utils.asGridCoord(7, 4)]: true,
      [utils.asGridCoord(8, 4)]: true,
      [utils.asGridCoord(9, 4)]: true,
    },
  },
};
