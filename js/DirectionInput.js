class DirectionInput {
  constructor() {
    //this array it's will store the keydown, and multiple different keydown
    this.heldDirections = [];

    this.map = {
      ArrowUp: "up",
      KeyW: "up",
      ArrowDown: "down",
      KeyS: "down",
      ArrowLeft: "left",
      KeyA: "left",
      ArrowRight: "right",
      KeyD: "right",
    };
  }

  get direction() {
    return this.heldDirections[0];
  }

  init() {
    document.addEventListener("keydown", (e) => {
      const dir = this.map[e.code];

      //if dir not null and index of dir not found in heldDirection == true
      if (dir && this.heldDirections.indexOf(dir) == -1) {
        // add to the first index (0)
        this.heldDirections.unshift(dir);
      }
    });
    document.addEventListener("keyup", (e) => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);

      if (index > -1) {
        // if found the dir in heldDirection destroy that on the first index(0)
        this.heldDirections.splice(index, 1);
      }
    });
  }
}
