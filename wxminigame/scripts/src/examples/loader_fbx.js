import { FBXLoader } from '../loaders/FBXLoader.js';

let camera, scene, clock;

let mixer;

function init() {
	clock = new THREE.Clock();
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.set(100, 200, 300);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xa0a0a0);
	scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

	const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
	hemiLight.position.set(0, 200, 0);
	scene.add(hemiLight);

	const dirLight = new THREE.DirectionalLight(0xffffff);
	dirLight.position.set(0, 200, 100);
	dirLight.castShadow = true;
	dirLight.shadow.camera.top = 180;
	dirLight.shadow.camera.bottom = - 100;
	dirLight.shadow.camera.left = - 120;
	dirLight.shadow.camera.right = 120;
	scene.add(dirLight);

	// scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

	// ground
	const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add(mesh);

	const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
	grid.material.opacity = 0.2;
	grid.material.transparent = true;
	scene.add(grid);

	// model
	const loader = new FBXLoader();
	loader.load('https://krapnik.cn/three-minigame-adapter/models/fbx/Samba Dancing.fbx', function (object) {

		mixer = new THREE.AnimationMixer(object);

		const action = mixer.clipAction(object.animations[0]);
		action.play();

		object.traverse(function (child) {

			if (child.isMesh) {

				child.castShadow = true;
				child.receiveShadow = true;

			}

		});

		scene.add(object);

	});


	const controls = new THREE.OrbitControls(camera, window.renderer.domElement);
	controls.target.set(0, 100, 0);
	controls.update();
}



function animate() {
	const delta = clock.getDelta();

	if (mixer) mixer.update(delta);
}

function dispose() {
	window.renderer.outputEncoding = THREE.LinearEncoding;
	scene.clear();
	camera.clear();
	clock.stop();
	scene = null;
	camera = null;
	clock = null;
}

export default class FBXLoaderDemo {
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