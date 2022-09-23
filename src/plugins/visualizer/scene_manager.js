import * as THREE from 'three'
// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';


/**
 * @class
 * @classdesc Singleton extension of THREE.Scene class
 * @extends THREE.Scene
 */
 class SceneManager extends THREE.Scene{
 
   constructor(){
     if(!instance){
       super();
      //  this.background = new THREE.Color('#000000');
      //  this.environment = new RoomEnvironment();
       instance = this;
     }
     return instance;
   }
 
 }
 
 var instance = new SceneManager();
 export default instance;
 