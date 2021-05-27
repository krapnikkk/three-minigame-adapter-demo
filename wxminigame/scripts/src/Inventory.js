export default class Inventory {
    constructor() {
        this.init();
    }

    init() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true,canvas});
        this.renderer.setClearColor(0X222222);
        this.renderer.sortObjects = false;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.localClippingEnabled = true;
        this.renderer.autoClear = false;

        this.scene = new THREE.Scene();

        fgui.Stage.init(this.renderer);
        fgui.Stage.scene = this.scene;
        fgui.UIConfig.packageFileExtension = "bin";
        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/3DInventory").then(this.start.bind(this));

        var SCREEN_WIDTH = window.innerWidth;
        var SCREEN_HEIGHT = window.innerHeight;
        var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        this.camera = new THREE.PerspectiveCamera(60, aspect, 1, 2000);
        this.camera.position.set(500, 200, 500);
        this.camera.lookAt(this.scene.position);


        this.animate();
    }

    start() {
        this._view = fgui.UIPackage.createObject("3DInventory", "Main").asCom;
        this._view.displayObject.setLayer(0);
        this._view.displayObject.camera = this.camera;

        let container = new THREE.Group();
        // container.scale.set(0.5, 0.5, 0.5);
        container.rotation.y = Math.PI / 6;
        container.add(this._view.obj3D);
        this.scene.add(container);

        let helper = new THREE.GridHelper(2000, 10);
        this.scene.add(helper);

        let helper2 = new THREE.AxesHelper(2000);
        this.scene.add(helper2);

        this._view.getTransition("show").play();
    }

    render() {
        fgui.Stage.update();

        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
        this.renderer.render(this.scene, fgui.Stage.camera);
    }

    animate = () => {
        requestAnimationFrame(this.animate)
        this.render()
    }
}

