import {
  CSS3DRenderer,
  CSS3DObject
} from 'three/examples/jsm/renderers/CSS3DRenderer.js'

import * as THREE from 'three'

var VUE3DRendererInstance = null;

class VUE3DRenderer extends CSS3DRenderer {

  constructor() {
    if (!VUE3DRendererInstance) {
      super();
      this.HTMLSprites = [];
      this.onReadyClbck = [];
      VUE3DRendererInstance = this;
    }
    return VUE3DRendererInstance;
  }

  init(container) {
    this.domElement.style.position = "absolute";
    this.domElement.style.top = 0;
    this.domElement.style.zIndex = 0;
    this.domElement.style.pointerEvents = "none";
    this.scene = new THREE.Scene();
    container.parentNode.appendChild(this.domElement);
  }

  renderHTMLSprites(){
    this.onReadyClbck.forEach(clbck=>{
      clbck();
    })
  }

  /**
   * Add HTMLSprite
   * 
   * Creates a 3DFied HTML Sprite
   */
  addHTMLSprite(vInstance) {
    this.onReadyClbck.push(() => {
      this.HTMLSprites.push(new HTMLSprite(
        vInstance,
        this.scene
      ));
    })
  }

  getHTMLSpriteHandle(name){
    return this.HTMLSprites.find(s=>{
      return s.vInstanceHandle.$vnode.type.name === name;
    })
  }

}

class HTMLSprite {

  constructor(vInstance, scene) {
    this.el = vInstance.$el;
    console.log(vInstance)
    this.vInstanceHandle = vInstance;
    this.CSS3DObjectHandle = null;
    this.position = vInstance.$data.position;
    this.rotation = vInstance.$data.rotation;
    this.scale = vInstance.$data.scale
    this.init(scene);
  }

  init(scene) {
    this.CSS3DObjectHandle = new CSS3DObject(this.el);
    this.CSS3DObjectHandle.position.copy(this.position);
    this.CSS3DObjectHandle.rotation.setFromVector3(this.rotation);
    this.CSS3DObjectHandle.scale.multiplyScalar(this.scale);
    scene.add(this.CSS3DObjectHandle);
  }

}

VUE3DRendererInstance = new VUE3DRenderer();
export default VUE3DRendererInstance;