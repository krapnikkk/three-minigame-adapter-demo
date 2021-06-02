import { GLTFLoader } from "../loaders/GLTFLoader.js";
let scene, camera;
let model, skeleton, mixer, clock, loaded = false;

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(1, 2, - 3);
    camera.lookAt(0, 1, 0);

    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(- 3, 10, - 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(dirLight);

    // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    // ground

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    window.renderer.outputEncoding = THREE.sRGBEncoding;
    window.renderer.shadowMap.enabled = true;

    const loader = new GLTFLoader();
    loader.load('https://krapnik.cn/three-minigame-adapter/models/gltf/Soldier.glb', function (gltf) {

        model = gltf.scene;
        scene.add(model);

        model.traverse(function (object) {

            if (object.isMesh) object.castShadow = true;

        });

        skeleton = new THREE.SkeletonHelper(model);
        skeleton.visible = false;
        skeleton.receiveShadow = true;
        scene.add(skeleton);

        const animations = gltf.animations;

        mixer = new THREE.AnimationMixer(model);
        let walkAction = mixer.clipAction(animations[3]);

        walkAction.play();
        loaded = true;

    });
}


function animate() {

    if (loaded) {
        let mixerUpdateDelta = clock.getDelta();
        mixer.update(mixerUpdateDelta);
    }
}

function dispose() {
    window.renderer.outputEncoding = THREE.LinearEncoding;
    scene.clear();
    camera.clear();
    clock.stop();
    loaded = false;
    scene = null;
    camera = null;
    clock = null;
}

export default class SkinningDemo {
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