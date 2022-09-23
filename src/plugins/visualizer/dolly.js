import * as THREE from 'three'
import AnimationManager from './animation_manager.js'
import ScrollHandler from '../utils/scroll.handler.js'

var DollyStopId = 0
var DollyInstance = null;

const FOCUS_MODES = {
  AUTO: 0,
  SCROLL: 1
}

class DollyStop {

  constructor(data) {
    this.name = data.name || "Unnamed Step";
    this.position = data.position || new THREE.Vector3(0, 0, 0);
    this.target = data.target || new THREE.Vector3(0, 0, 0);
    this.onStart = data.onStart || (() => {});
    this.onEnd = data.onEnd || (() => {});
    this.onExit = data.onExit || (() => {});
    this.id = DollyStopId++;
    this.duration = data.duration || 1000;
  }

  setFocus(mode = FOCUS_MODES.AUTO, duration = 1000, easing = true) {
    DollyInstance.setDestination(
      this.position,
      this.target
    )
    if (mode === FOCUS_MODES.AUTO) {
      this.onStart();
      this.autoFocus(duration, easing);
    } else if (mode === FOCUS_MODES.SCROLL) {
      this.onStart();
      this.scrollFocus();
    } else {
      throw new Error(`Focus mode should be one of [${Object.values(FOCUS_MODES).join(",")}]. got ${mode}.`)
    }
  }

  scrollFocus() {
    var i = 0;
    DollyInstance.controlsHandle.enableRotate = false;
    const scrollTargethandler = ScrollHandler.pushWheelHandler((delta) => {
      if (i >= 0 && i <= 100) {
        i = Math.min(Math.max(i + delta, 0), 101);
        DollyInstance.update(i / 100);
      } else if (i > 100) {
        DollyInstance.update(1);
        DollyInstance.controlsHandle.enableRotate = true;
        ScrollHandler.removeWheelHandler(scrollTargethandler);
        this.onEnd();
      }
    });
  }

  autoFocus(duration, easing) {
    DollyInstance.update(0);
    const animationHandle = AnimationManager.add((t) => {
      if (t * 1000 >= duration) {
        AnimationManager.dispose(animationHandle);
        DollyInstance.update(1);
        this.onEnd()
      } else {
        let perc = (t * 1000 / duration)
        let eased = easing ? -(Math.cos(Math.PI * (perc)) - 1) / 2 : perc;
        DollyInstance.update(eased);
      }
    })
  }

}

class Dolly {

  constructor() {
    if (!DollyInstance) {
      this.cameraPosition = {
        start: new THREE.Vector3(0, 0, 0),
        end: new THREE.Vector3(0, 0, 0),
        delta: new THREE.Vector3(0, 0, 0)
      }
      this.cameraTarget = {
        start: new THREE.Vector3(0, 0, 0),
        end: new THREE.Vector3(0, 0, 0),
        delta: new THREE.Vector3(0, 0, 0)
      }
      this.stops = [];
      this.stop = null;
      DollyInstance = this;
      this.bokehHandle = null;
    }
    return DollyInstance
  }

  init(camera, controls) {
    this.cameraHandle = camera;
    this.controlsHandle = controls;
  }

  addStop(stopData) {
    this.stops.push(new DollyStop(stopData));
  }

  getStop(name) {
    return this.stops.find(stop => stop.name === name);
  }

  travelToStop(name, mode = FOCUS_MODES.AUTO, duration = 1000, easing = true) {
    let stop = this.stops.find(stop => stop.name === name);
    if (this.stop) {
      this.stop.onExit();
    }
    if (stop) {
      this.stop = stop;
      stop.setFocus(mode, duration, easing);
    } else {
      throw new Error(`Cannot find stop ${name} in stop pool.`)
    }
  }

  travelToPreviousStop() {
    let stopIndex = this.stops.findIndex(stop => stop.id === this.stop.id);
    if (stopIndex > -1 && stopIndex - 1 >= 0) {
      this.travelToStop(this.stops[stopIndex - 1].name);
      return true;
    }
    return false;
  }

  travelToNextStop() {
    let stopIndex = this.stops.findIndex(stop => stop.id === this.stop.id);
    if (stopIndex > -1 && stopIndex + 1 < this.stops.length) {
      this.travelToStop(this.stops[stopIndex + 1].name);
    }
    return stopIndex + 1 != this.stops.length - 1
  }

  setDestination(position, target) {
    this.cameraPosition = {
      start: this.cameraHandle.position.clone(),
      end: new THREE.Vector3(position.x, position.y, position.z),
      delta: {
        x: position.x - this.cameraHandle.position.x,
        y: position.y - this.cameraHandle.position.y,
        z: position.z - this.cameraHandle.position.z
      }
    }
    var box = new THREE.Box3().setFromObject(target);
    var center = new THREE.Vector3();
    box.getCenter(center);
    this.cameraTarget = {
      start: this.controlsHandle.target.clone(),
      end: center,
      delta: {
        x: center.x - this.controlsHandle.target.x,
        y: center.y - this.controlsHandle.target.y,
        z: center.z - this.controlsHandle.target.z
      }
    }
  }

  update(travelPercent) {
    if (travelPercent >= 0.0 && travelPercent < 1.0) {
      this.cameraHandle.position.setX(this.cameraPosition.start.x + this.cameraPosition.delta.x * travelPercent);
      this.cameraHandle.position.setY(this.cameraPosition.start.y + this.cameraPosition.delta.y * travelPercent);
      this.cameraHandle.position.setZ(this.cameraPosition.start.z + this.cameraPosition.delta.z * travelPercent);
      this.controlsHandle.target.setX(this.cameraTarget.start.x + this.cameraTarget.delta.x * travelPercent);
      this.controlsHandle.target.setY(this.cameraTarget.start.y + this.cameraTarget.delta.y * travelPercent);
      this.controlsHandle.target.setZ(this.cameraTarget.start.z + this.cameraTarget.delta.z * travelPercent);
      if (this.bokehHandle) {
        let lfocus = this.cameraPosition.end.distanceTo(this.cameraTarget.end) * travelPercent;
        this.bokehHandle.uniforms['focus'].value = lfocus;
        this.bokehHandle.uniforms['aperture'].value = 0.022 / (lfocus);
      }
    } else {
      this.cameraHandle.position.copy(this.cameraPosition.end);
      this.controlsHandle.target.copy(this.cameraTarget.end);
    }
  }

}

DollyInstance = new Dolly();
export default DollyInstance;