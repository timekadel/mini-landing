'use strict'

import * as THREE from 'three'


export default class Terminal {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = null;
    this.texture = null;
    this.timeoutHandle = null;
    this.init();
  }


  init() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "absolute";
    this.canvas.style.display = "none"
    this.canvas.ctx = this.canvas.getContext('2d')
    document.body.appendChild(this.canvas);
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    this.canvas.ctx.fillStyle = '#000000';
    this.canvas.ctx.font = "8px Courier"
    this.canvas.ctx.fillRect(0, 0, this.width, this.height);
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.flipY = false;
  }

  run(header = "HelloWorld", command_prefix = "root@timekadel", commands = []) {
    this.stop();
    this.header = header.split("\n");
    this.command_prefix = command_prefix;
    this.commands = commands;
    this.print();
  }

  stop() {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
    }
  }

  async print() {
    var lr = 0;
    for (let i = 0; i < this.header.length; i++) {
      let line = this.header[i];
      this.canvas.ctx.fillStyle = '#00ff00';
      lr++;
      for (let j = 0; j < line.length; j++) {
        this.canvas.ctx.fillText(line[j], j * 6, 20 + lr * 8);
        if (!(j % 10)) {
          this.texture.needsUpdate = true;
          await new Promise(resolve => {
            setTimeout(() => resolve(), 1)
          })
        }
      }
    }
    for (let i = 0; i < this.commands.length; i++) {
      lr++;
      this.canvas.ctx.fillText(this.command_prefix, 10, 20 + lr * 9)
      for (let j = 0; j < this.commands[i].length; j++) {
        this.canvas.ctx.fillText(this.commands[i][j], 6 * (j + this.command_prefix.length - 4), 20 + lr * 9);
        if (!(j % 2)) {
          this.texture.needsUpdate = true;
          await new Promise(resolve => {
            setTimeout(() => resolve(), 100)
          })
        }
      }
    }
    await new Promise(resolve => {
      setTimeout(() => {
        this.canvas.ctx.clearRect(0, 0, this.width, this.height);
        this.texture.needsUpdate = true;
        this.print();
        resolve();
      }, 500)
    })
  }


}