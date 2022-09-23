'use strict'

import * as THREE from 'three';
import AnimationManager from './animation_manager'
import {
  EventEmitter
} from 'events'

const ACTION = {
  SIT_IDLE: 0,
  SIT_TYPE: 1,
  SIT_UP: 2,
  STAND_IDLE: 3,
  STAND_WALK: 4,
  STAND_RUN: 5
}

const CONTROL_KEYS = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  SPACE: " "
}

const MOVING_CHARACTER_FLAG = false;
const ANIMATION_FADEIN = .5;

class CharacterController extends EventEmitter {

  constructor(character) {
    super();
    this.actions = [];
    this.characterHandle = character;
    this.action = null;
    this.duration = 1000;
    this.animationHandle = null;
    this.directions = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    this.prevDirections = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    this.mixer = new THREE.AnimationMixer(this.characterHandle.scene);
  }

  get isSitting() {
    return this.action >= ACTION.SIT_UP && this.action <= ACTION.SIT_IDLE;
  }

  get isStanding() {
    return this.action >= ACTION.STAND_IDLE && this.action <= ACTION.STAND_RUN;
  }

  init() {
    this.actions = this.characterHandle.animations.map(animation => {
      return this.mixer.clipAction(animation);
    })
    const clock = new THREE.Clock();
    AnimationManager.add(() => {
      this.mixer.update(clock.getDelta());
    })
    this.characterHandle.skeleton = this.characterHandle.scene.getObjectByName("head").skeleton;
    this.characterHandle.head = this.characterHandle.skeleton.bones[6];
    this.characterHandle.hips = this.characterHandle.skeleton.bones[3];
    this.setAction(0);
    if (MOVING_CHARACTER_FLAG) {
      window.addEventListener("keydown", this.keydownHandler.bind(this));
      window.addEventListener("keyup", this.keyupHandler.bind(this));
      AnimationManager.add(this.update.bind(this))
    }
  }

  update() {
    if (Object.values(this.directions).includes(true)) {
      this.setAction(2);
    } else {
      this.setAction(0)
    }
    let moveX = 0;
    let moveY = 0
    if (this.directions.up) {
      moveY = 0.1;
    } else if (this.directions.down) {
      moveY = -0.1;
    }
    if (this.directions.left) {
      moveX = 0.1;
    } else if (this.directions.right) {
      moveX = -0.1;
    }
    this.prevDirections = {
      ...this.directions
    };

    this.characterHandle.scene.translateZ(moveY);
    this.characterHandle.scene.rotateY(moveX)
    this.characterHandle.updateProjectionMatrix

  }

  keydownHandler(e) {
    switch (e.key) {
      case CONTROL_KEYS.UP:
        this.directions.up = true;
        break;
      case CONTROL_KEYS.DOWN:
        this.directions.down = true;
        break;
      case CONTROL_KEYS.LEFT:
        this.directions.left = true;
        break;
      case CONTROL_KEYS.RIGHT:
        this.directions.right = true;
        break;
    }
  }

  keyupHandler(e) {
    switch (e.key) {
      case CONTROL_KEYS.UP:
        this.directions.up = false;
        break;
      case CONTROL_KEYS.DOWN:
        this.directions.down = false;
        break;
      case CONTROL_KEYS.LEFT:
        this.directions.left = false;
        break;
      case CONTROL_KEYS.RIGHT:
        this.directions.right = false;
        break;
    }
  }

  async setAction(actionID, loopStyle = THREE.LoopOnce) {
    return new Promise((resolve, reject) => {
      let action = this.actions[actionID];
      if (actionID != null && action != null) {
        action.loop = loopStyle;
        action.clampWhenFinished = true;
        action.weight = 1;
        if (this.action != null && this.action !== action) {
          action.reset();
          this.action.crossFadeTo(action, ANIMATION_FADEIN);
          action.play();

        } else if (this.action == null) {
          action.play()
        }
        this.mixer.addEventListener('finished', () => {
          resolve();
        }, true)
        this.action = action;
      } else {
        reject(new Error(`Could not find ${actionID} in action list`))
      }
    })
  }

  async travelAlongPath(path) {
    return new Promise(resolve => {
      let position = 0;
      let point = null;
      let angle = 0;
      let tangent = 0;
      this.animationHandle = AnimationManager.add(() => {
        position += 0.02;
        point = path.getPointAt(position);
        if (point != null) {
          this.characterHandle.scene.position.setX(point.x);
          this.characterHandle.scene.position.setY(point.y);
          tangent = path.getTangent(position).normalize();
          angle = -Math.atan(tangent.x / tangent.y);
          this.characterHandle.scene.rotation.y = (angle)
        } else {
          AnimationManager.dispose(this.animationHandle);
          resolve();
        }
      })
    });
  }

}

export default CharacterController;