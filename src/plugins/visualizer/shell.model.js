import * as THREE from 'three';
import AnimationManager from './animation_manager.js'
import SceneManager from './scene_manager.js';


const TXLoader = new THREE.TextureLoader();

const SHELL_DIAMETER = 0.055;
const G = 9.8;
const V0 = 18.0;
const V0X = V0 * Math.cos(Math.PI / 2);
const V0Z = V0 * Math.sin(Math.PI / 2);

const BALL_GEO = new THREE.IcosahedronGeometry(SHELL_DIAMETER, 1);
const BALL_MAT = new THREE.MeshBasicMaterial()
const STARS_MAT = new THREE.PointsMaterial({
  color: "red",
  size: 5,
  transparent: true,
  alphaMap: TXLoader.load("/visualizer/textures/roundshadow_lm.png"),
  blending: THREE.AdditiveBlending,
  depthWrite: false
})

class Shell {

  constructor(color) {
    this.ball = new THREE.Mesh(BALL_GEO, BALL_MAT);
    this.stars = new THREE.Points(BALL_GEO.clone(), STARS_MAT.clone())
    this.stars.rotation.set(
      Shell._floatRandInterval(0,Math.PI),
      Shell._floatRandInterval(0,Math.PI),
      Shell._floatRandInterval(0,Math.PI),
    )
    this.stars.material.size = 0;
    this.stars.material.color.set(color || 0xffffff);
    this.initialPosition = new THREE.Vector3();
    this.animationHandle = null;
    SceneManager.add(this.stars);
  }

  set position(position) {
    this.stars.position.set(
      position.x,
      position.y,
      position.z
    )
  }

  launch() {
    this.initialPosition = this.stars.position.clone(this.initialPosition);
    this.animationHandle = AnimationManager.add(this.animate.bind(this))
  }

  animate(t) {
    if (t < 1.8) {
      this.rise(t)
    } else if (t < 4) {
      this.explode((t - 1.8) * 50);
    }else if(t > 4){
      AnimationManager.dispose(this.animationHandle);
      SceneManager.remove(this.stars);
    }
  }

  rise(t) {
    let x = this.initialPosition.x + V0X * t;
    let z = this.initialPosition.z + V0Z * t - (G * t * t) / 2.0;
    this.stars.position.setX(x);
    this.stars.position.setZ(z);
  }


  explode(t) {
    const effectFactor = Math.abs(Math.cos((t / 110) * Math.PI / 2 - Math.PI));
    this.stars.material.size = effectFactor * 4;
    this.stars.scale.set(this.stars.scale.x + effectFactor * 2, this.stars.scale.y + effectFactor * 2, this.stars.scale.z + effectFactor * 2)
  }

  static _floatRandInterval(min, max) {
    return Math.random() * (max - min) + min;
  }

}

export default Shell;