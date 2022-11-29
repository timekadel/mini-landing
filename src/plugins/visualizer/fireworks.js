'use strict'

import Shell from "./shell.model"

const STARS_COLORS = ["#ff19d7",
  "#01ce33",
  "#ce6cff",
  "#ff4a98",
  "#00d88e",
  "#f3bf2c",
  "#ff4737",
  "#f93448",
  "#3d7ffa",
  "#ffe45a",
  "#cf92ff",
  "#00fb7c",
  "#ffb193",
  "#00e0e6",
  "#96ffe7"
];


class Firework {

  constructor() {
    if (!fireworkInstance) {
      this.intervalHandle = null;
      fireworkInstance = this;
    }
    return fireworkInstance;
  }

  start() {
    if (!this.intervalHandle) {
      this.fire();
      this.intervalHandle = setInterval(() => {
        this.fire();
      }, 1000)
    }
  }

  fire() {
    const shell = new Shell(
      STARS_COLORS[Math.floor(Math.random() * STARS_COLORS.length)]
    );
    shell.position = {
      x: Math.random() * (10 + 10) - 10,
      y: Math.random() * (20 - 10) + 10,
      z: Math.random() * (-5 - 0) + 0
    }
    shell.launch();
  }

  stop() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = null;
    }
  }

}

var fireworkInstance = new Firework();
export default fireworkInstance;