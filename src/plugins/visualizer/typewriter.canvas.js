'use strict'

import * as THREE from 'three'
import AnimationManager from './animation_manager'
import {
  EventEmitter
} from 'events'

const FPS = {
  MIN: 50,
  MAX: 100
}

export default class TypeWriter extends EventEmitter {

  constructor(width, height) {
    super()
    this.width = width;
    this.height = height;
    this.canvas = null;
    this.texture = null;
    this.timeoutHandle = null;
    this.animationHandle = null;
    this.timeDelta = 0;
    this.time = 0;
    this.init();
  }

  init() {
    this.canvas = document.createElement("canvas");
    this.canvas.ctx = this.canvas.getContext('2d')
    document.body.appendChild(this.canvas);
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    this.canvas.ctx.fillStyle = '#000000';
    this.canvas.ctx.fillRect(0, 0, this.width, this.height);
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.flipY = false;
  }

  async run(message) {
    this.stop();
    return new Promise(resolve => {
      this.index = 0;
      this.time = 0;
      this.message = message;
      this.animationHandle = AnimationManager.add(this.update.bind(this));
      this.once('end', ()=>{
        resolve();
      })
    })

  }

  stop() {
    if (this.animationHandle) {
      AnimationManager.dispose(this.animationHandle);
      this.emit('end')
    }
  }

  get randomTimeDelta() {
    return Math.floor(Math.random() * (FPS.MAX - FPS.MIN + 1) + FPS.MIN)
  }

  update(t) {
    if ((t - this.time) * 1000 >= this.timeDelta) {
      let chars = (this.message.text.substr(0, this.index) + (this.index == this.message.text.length ? '' : "_")).split("\n");
      this.canvas.ctx.clearRect(0, 0, this.width, this.height)
      this.canvas.ctx.fillStyle = '#000000';
      this.canvas.ctx.fillRect(0, 0, this.width, this.height)
      this.canvas.ctx.fillStyle = '#FFFFFF';
      chars.forEach((c, i) => {
        this.canvas.ctx.font = `${this.message.font.weight} ${this.message.font.size}px ${this.message.font.family}`;
        this.canvas.ctx.fillText(c, 10, (i + 1) * (this.message.font.size + this.message.font.size / 4));
      })
      if (this.index <= this.message.text.length) {
        this.texture.needsUpdate = true
        this.index++;
        this.timeDelta = this.randomTimeDelta;
      } else {
        this.stop();
      }
      this.time = t;
    }
  }

}