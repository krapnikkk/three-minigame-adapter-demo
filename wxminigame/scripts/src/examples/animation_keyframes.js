import { RoomEnvironment } from "../environments/RoomEnvironment.js";
import { DRACOLoader } from "../loaders/DRACOLoader.js";
import { GLTFLoader } from "../loaders/GLTFLoader.js";
let mixer, clock, scene, camera, pmremGenerator;


// const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0, 0.5, 0);
// controls.update();
// controls.enablePan = false;
// controls.enableDamping = true;



function init() {
    clock = new THREE.Clock();
    pmremGenerator = new THREE.PMREMGenerator(window.renderer);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(5, 2, 8);
    window.renderer.outputEncoding = THREE.sRGBEncoding;
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://krapnik.cn/three-minigame-adapter/libs/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load('https://krapnik.cn/three-minigame-adapter/models/gltf/LittlestTokyo.glb', function (gltf) {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();

        animate();

    }, undefined, function (e) {
        console.error(e);
    });
}


function animate() {


    const delta = clock.getDelta();
    if (mixer) {
        mixer.update(delta);
    }

    // controls.update();

}

function dispose() {
    window.renderer.outputEncoding = THREE.LinearEncoding;
    scene.clear();
    camera.clear();
    clock.clear();
    scene = null;
    camera = null;
    clock = null;
}

export default class KeyFramesDemo {
    constructor() {
        init();
        this.scene = scene;
        this.camera = camera;
        this.removed = false;
    }

    animate() {
        if (!this.removed) {
            animate();
        }
    }

    dispose() {
        this.removed = true;
        dispose();
    }
}