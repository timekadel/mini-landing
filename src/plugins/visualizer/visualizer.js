import * as THREE from 'three'
var TXLoader = new THREE.TextureLoader();

/**
 * THREE.Vector3 round prototype override.
 * Allows for precision-specified rounding
 * 
 * @param {Number} digits Decimal place of rounding
 * @returns {Object} THREE.Vector3 instance
 * @todo put every overrides in an override.js module
 */
THREE.Vector3.prototype.round = function (digits) {
  var e = Math.pow(10, digits || 0);
  this.x = Math.round(this.x * e) / e;
  this.y = Math.round(this.y * e) / e;
  this.z = Math.round(this.z * e) / e;
  return this;
}

import {
  EventEmitter
} from 'events'
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import ModelInstancer from './model_instancer.js'
import SceneManager from './scene_manager.js'
import AnimationManager from './animation_manager.js';
import DollyInstance from './dolly.js';
import CharacterController from './character.controller.js';
import VUE3DRenderer from './vue3d_renderer.js';
import Terminal from './terminal.canvas.js'
// import Fireworks from './fireworks';

var visualizerInstance = null;

const LOADING_STATES = [
  "Preparing WebGL context",
  "Preparing camera",
  "Setting up controls",
  "Instanciating Css3D context",
  "Setting up terrain",
  "Setting up lighting",
  "Loading models",
  "Storing scene references",
  "Setting up dynamic textures",
  "Preparing dolly stops"
]

/**
 * @class
 * @classdesc WebGL Visualizer instance
 */
class Visualizer extends EventEmitter {

  /**
   * Constructs Visualizer instance
   * 
   * @param {Object} domElement handle to domElement to be used by the WEBGL renderer 
   */
  constructor() {
    super();
    if (!visualizerInstance) {
      this.domElement = null;
      this.renderer = null;
      this.camera = null;
      this.controls = null;
      this.animation = null;
      this.dolly = null;
      this.loadingState = 0;
      visualizerInstance = this;
      this.ready = false;
    }
  }

  get loadingValue() {
    return Math.floor((this.loadingState / LOADING_STATES.length) * 100)
  }

  get loadingMessage() {
    return LOADING_STATES[this.loadingState % LOADING_STATES.length]
  }

  set loadingState(state) {
    this._loadingState = state;
    this.emit("loading")
  }

  get loadingState() {
    return this._loadingState;
  }

  /**
   * Initialises WebGL Visualizer instance
   * 
   * @public
   * @async
   */
  async init(domElement) {
    if (domElement) {
      try {
        this.domElement = domElement
        this.prepareRenderer();
        this.loadingState++
        this.prepareCamera();
        this.loadingState++
        this.prepareControls();
        this.loadingState++
        this.resize();
        VUE3DRenderer.init(this.domElement);
        this.loadingState++
        DollyInstance.init(this.camera, this.controls)
        await this.main();
      } catch (err) {
        console.error(err)
      }
    } else {
      throw new Error("Please provide the DOM Element to be used for render");
    }
  }

  /**
   * Prepares WebGL renderer
   * 
   * @public
   */
  prepareRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.domElement,
      antialias: true,
      alpha: true
    });
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.autoClear = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.autoUpdate = false;
    this.renderer.shadowMap.type = THREE.BasicShadowMap
    this.renderer.physicallyCorrectLights = true;
    this.renderer.domElement.style.top = 0;
    this.renderer.domElement.style.zIndex = 1;
    this.renderer.domElement.style.cursor = "grab"
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
  }


  /**
   * Prepares Visualizer's camera
   * 
   * @public
   */
  prepareCamera() {
    var aspect = 1;
    this.camera = new THREE.PerspectiveCamera(45, aspect, .2, 40);
    this.camera.up.set(0, 0, 1)
    this.camera.position.y = 11.53;
    this.camera.position.z = 3.57;
    this.camera.position.x = 9.67;
    this.camera.lookAt(-0.19, -0.31, 2.27);
  }

  /**
   * Prepares Visualizer's camera controls
   * 
   * @public
   */
  prepareControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 0;
    this.controls.maxDistance = 20;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = .1
    this.controls.rotateSpeed = .5;
    this.controls.enableZoom = false;

    this.previousPosition = new THREE.Vector3()

    this.controls.addEventListener('start', () => {
      this.previousPosition = this.camera.position.clone();
    })

    this.controls.addEventListener('end', () => {
      if (!this.camera.position.round(2).equals(this.previousPosition.round(2)) && DollyInstance.stop != null && this.controls.enableRotate) {
        DollyInstance.stop.setFocus()
      }
    })

    AnimationManager.add(() => {
      this.controls.update();
    })

  }

  /**
   * Resize handler.
   * Handles renderer's resizing and ensures preservation of screen aspect ratio.
   * 
   * @public
   */
  resize() {
    var width = this.domElement.offsetWidth;
    var height = this.domElement.clientHeight;
    var aspect = width / height;
    if (this.width != width || this.height != height) {
      this.width = width;
      this.height = height;
      this.renderer.setSize(width, height);
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
      VUE3DRenderer.setSize(width, height);
    }
  }

  /**
   * Render function
   * 
   * @public
   */
  render() {
    this.renderer.render(SceneManager, this.camera);
    VUE3DRenderer.render(VUE3DRenderer.scene, this.camera);
  }

  /**
   * Starts rendering loop.
   * Pools the rendering function into the animation manager's pool
   * 
   * @public
   */
  startRender() {
    if (!this.animation) {
      this.animation = AnimationManager.add(this.render.bind(this));
    }
  }

  /**
   * Stops rendering loop.
   * Removes of the rendering function from the animation manager's pool
   * 
   * @public
   */
  stopRender() {
    if (this.animation) {
      AnimationManager.dispose(this.animation);
      this.animation = null;
    }
  }

  setupOutdoor() {

    const terrain_geometry = new THREE.PlaneBufferGeometry(32, 32, 20, 20);
    const terrain = new THREE.Mesh(terrain_geometry, new THREE.MeshPhongMaterial({
      shininess: 0,
      side: THREE.DoubleSide,
      transparent: true,
      map: TXLoader.load("/visualizer/textures/Asphalt_004_COLOR.jpg"),
      normalMap: TXLoader.load("/visualizer/textures/Asphalt_004_NRM.jpg"),
      displacementMap: TXLoader.load("/visualizer/textures/Asphalt_004_DISP.png"),
      displacementBias: -.7,
      displacementScale: 1.5,
      alphaMap: TXLoader.load("/visualizer/textures/roundshadow_lm.png"),
    }));

    terrain.position.setZ(-.1);
    terrain.receiveShadow = true;

    const globalPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), .4);
    this.renderer.clippingPlanes = [globalPlane];

    SceneManager.add(terrain);

  }

  setupLighting() {

    const sunlight = new THREE.HemisphereLight("pink", "red", .8);
    this.lights = [
      new THREE.PointLight("blue", .8),
      new THREE.PointLight("pink", .8),
      new THREE.DirectionalLight("red", .8),
    ]

    this.lights[0].position.set(-0.5, -0.5, 2.5)
    this.lights[0].castShadow = false;
    this.lights[0].shadow.autoUpdate = false;

    this.lights[1].position.set(-1, -1, 3)
    this.lights[1].castShadow = true;
    this.lights[1].shadow.autoUpdate = false;

    this.lights[2].position.set(1, 1, 3)
    this.lights[2].castShadow = false;
    this.lights[2].shadow.autoUpdate = false;

    SceneManager.add(sunlight, this.lights[0], this.lights[1], this.lights[2]);
  }

  async loadExternalAssets() {

    await ModelInstancer.init("/visualizer/models/model_list.json");

    const character_model = ModelInstancer.models.visualizer.models.scenes.character;
    const desk_model = ModelInstancer.models.visualizer.models.scenes.desk;

    const curriculum = new THREE.Mesh(
      new THREE.PlaneGeometry(.2, .282),
      new THREE.MeshPhongMaterial({
        color: "white",
        map: TXLoader.load("/visualizer/textures/CV_FR.png")
      })
    )
    curriculum.name = "curriculum"

    character_model.scene.name = "character_model";
    desk_model.scene.name = "desk_model";

    character_model.scene.updateMatrixWorld(true, true);
    character_model.scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = false;
        object.material.shadowSide = THREE.BackSide;
      }
    })

    desk_model.scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.shadowSide = THREE.BackSide;
        object.material.side = THREE.FrontSide;
        // object.material.roughness = 1;
        // object.material.roughnessMap = null;
      }
    })

    character_model.scene.rotation.set(Math.PI / 2.0, 0, 0);
    character_model.scene.position.set(.8, .65, .05);
    character_model.scene.scale.set(1.2, 1.2, 1.2);

    curriculum.rotation.set(0, 0, Math.PI);
    curriculum.position.set(.5, 0, .91);

    desk_model.scene.rotation.set(Math.PI / 2.0, 0, 0);
    desk_model.scene.position.set(.8, .65, .05);
    desk_model.scene.scale.set(1.2, 1.2, 1.2);

    this.characterController = new CharacterController(character_model, this.camera, this.bokehPass);
    this.characterController.init();

    SceneManager.add(character_model.scene, desk_model.scene, curriculum);

  }

  storeSceneAssetsReferences() {
    this.scene_assets = {
      laptop_screen: SceneManager.getObjectByName("screen").children[1],
      skateboard: SceneManager.getObjectByName("skateboard"),
      character: SceneManager.getObjectByName("character_model"),
      curriculum: SceneManager.getObjectByName("curriculum")
    }
  }

  setupDynamicTextures() {

    this.dynamicTextures = {
      terminal: Terminal,
    }
    this.scene_assets.laptop_screen.material.map = this.dynamicTextures.terminal.texture;
    this.dynamicTextures.terminal.run(`
    ██╗    ██╗      ██████╗ ██╗   ██╗███████╗                                                              
    ██║    ██║     ██╔═══██╗██║   ██║██╔════╝                                                              
    ██║    ██║     ██║   ██║██║   ██║█████╗                                                                
    ██║    ██║     ██║   ██║╚██╗ ██╔╝██╔══╝                                                                
    ██║    ███████╗╚██████╔╝ ╚████╔╝ ███████╗                                                              
    ╚═╝    ╚══════╝ ╚═════╝   ╚═══╝  ╚══════╝                                                              
                                                                                                           
     ██████╗██╗   ██╗██████╗ ███████╗██████╗ ███████╗███████╗ ██████╗██╗   ██╗██████╗ ██╗████████╗██╗   ██╗
    ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝
    ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝███████╗█████╗  ██║     ██║   ██║██████╔╝██║   ██║    ╚████╔╝ 
    ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗╚════██║██╔══╝  ██║     ██║   ██║██╔══██╗██║   ██║     ╚██╔╝  
    ╚██████╗   ██║   ██████╔╝███████╗██║  ██║███████║███████╗╚██████╗╚██████╔╝██║  ██║██║   ██║      ██║   
     ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝`,
      "█ time@kadel:~# ",
      [
        "./hack_the_planet.sh",
        "10%",
        "40%",
        "70%",
        "90%",
        "100%. Done !",
        "gcc -o hello_world ./Documents/very_important_files/very_important_projects/hello_world.c",
        "./Documents/very_important_files/very_important_projects/hello_world",
        "Wow, such Hello World ! Very wow ^____^",
        "sudo reboot now",
        "shutting down...",
        "Bye█",
      ]
    )
  }

  prepareDollyStops() {
    const centerTargetHandle = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 'white'
      })
    );
    const backTargetHandle = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 'white'
      })
    );
    centerTargetHandle.position.copy(VUE3DRenderer.HTMLSprites[0].CSS3DObjectHandle.position)
    backTargetHandle.position.set(0,0,4.5)
    centerTargetHandle.position.setY(0)
    centerTargetHandle.translateZ(-2.3)
    DollyInstance.addStop({
      name: "overview",
      position: new THREE.Vector3(10.5, 10.5, 10.5),
      target: this.characterController.characterHandle.head,
    })
    DollyInstance.addStop({
      name: "introduction",
      position: new THREE.Vector3(0.43, 22, 7),
      target: centerTargetHandle,
    })
    DollyInstance.addStop({
      name: "age",
      position: new THREE.Vector3(-1, -4, 1.5),
      target: this.scene_assets.laptop_screen,
    })
    DollyInstance.addStop({
      name: "fireworks",
      position: new THREE.Vector3(-5, -14, 2.5),
      target: backTargetHandle,
    })
    DollyInstance.addStop({
      name: "skateboard",
      position: new THREE.Vector3(-2, -.5, 1),
      target: this.scene_assets.skateboard,
    })
    DollyInstance.addStop({
      name: "laptop",
      position: new THREE.Vector3(.94, .6, 1.67),
      target: this.scene_assets.laptop_screen,
    })
    DollyInstance.addStop({
      name: "curriculum",
      position: new THREE.Vector3(.5, .1, 1.5),
      target: this.scene_assets.curriculum,
    })
  }

  /**
   * Sets up visualizer environment
   * 
   * @public
   * @async
   */
  async main() {

    this.setupOutdoor();
    this.loadingState++;
    this.setupLighting();
    this.loadingState++;
    await this.loadExternalAssets();
    this.loadingState++;
    this.storeSceneAssetsReferences();
    this.loadingState++;
    this.setupDynamicTextures();
    this.loadingState++;
    this.startRender();


    await new Promise(resolve => {
      setTimeout(() => {
        this.renderer.shadowMap.needsUpdate = true;
        this.lights[1].shadow.needsUpdate = true;
        this.characterController.setAction(1, THREE.LoopPingPong);
        VUE3DRenderer.renderHTMLSprites();
        this.prepareDollyStops();
        this.loadingState++;

        resolve();
      })
    });

  }

}

visualizerInstance = new Visualizer();
export default visualizerInstance;