


let camera, scene, loaded = false;

let mesh,orbitControls;
const amount = 10;
const count = Math.pow(amount, 3);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(1, 1);
const color = new THREE.Color();


function init() {

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(amount, amount, amount);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();

    const light1 = new THREE.HemisphereLight(0xffffff, 0x000088);
    light1.position.set(- 1, 1.5, 1);
    scene.add(light1);

    const light2 = new THREE.HemisphereLight(0xffffff, 0x880000, 0.5);
    light2.position.set(- 1, - 1.5, - 1);
    scene.add(light2);

    const geometry = new THREE.IcosahedronGeometry(0.5, 3);
    const material = new THREE.MeshPhongMaterial();

    mesh = new THREE.InstancedMesh(geometry, material, count);

    let i = 0;
    const offset = (amount - 1) / 2;

    const matrix = new THREE.Matrix4();

    for (let x = 0; x < amount; x++) {

        for (let y = 0; y < amount; y++) {

            for (let z = 0; z < amount; z++) {

                matrix.setPosition(offset - x, offset - y, offset - z);

                mesh.setMatrixAt(i, matrix);
                mesh.setColorAt(i, color);

                i++;

            }

        }

    }

    scene.add(mesh);

    orbitControls = new THREE.OrbitControls(camera, window.renderer.domElement);

    window.addEventListener('touchstart', onTouchstart);
    loaded = true;
}

function onTouchstart(event) {
    event.preventDefault();
    mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.touches[0].clientY / window.innerHeight) * 2 + 1;
}

function animate() {

    render();
}

function render() {

    raycaster.setFromCamera(mouse, camera);

    const intersection = raycaster.intersectObject(mesh);

    if (intersection.length > 0) {

        const instanceId = intersection[0].instanceId;

        mesh.setColorAt(instanceId, color.setHex(Math.random() * 0xffffff));
        mesh.instanceColor.needsUpdate = true;

    }

}

function dispose() {
    window.renderer.outputEncoding = THREE.LinearEncoding;
    window.removeEventListener('touchstart', onTouchstart);
    scene.clear();
    camera.clear();
    orbitControls.dispose();
    loaded = false;
    scene = null;
    camera = null;
}

export default class RayCastDemo {
    constructor() {
        init();
        this.scene = scene;
        this.camera = camera;
        this.removed = false;
    }

    animate() {
        if (!this.removed) {
            animate(window.performance.now());
        }
    }

    dispose() {
        this.removed = true;
        dispose();
    }
}
