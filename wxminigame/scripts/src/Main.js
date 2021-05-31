import BasicDemo from "./userInterfaces/BasicDemo.js";
import TransitionDemo from "./userInterfaces/TransitionDemo.js";
import VirtualListDemo from "./userInterfaces/VirtualListDemo.js";
import LoopListDemo from "./userInterfaces/LoopListDemo.js";
import PullToRefreshDemo from "./userInterfaces/PullToRefreshDemo.js";
import ModalWaitingDemo from "./userInterfaces/ModalWaitingDemo.js";
import JoystickDemo from "./userInterfaces/JoystickDemo.js";
import BagDemo from "./userInterfaces/BagDemo.js";
import ListEffectDemo from "./userInterfaces/ListEffectDemo.js";
import GuideDemo from "./userInterfaces/GuideDemo.js";
import CooldownDemo from "./userInterfaces/CooldownDemo.js";
import HitTestDemo from "./userInterfaces/HitTestDemo.js";
import ChatDemo from "./userInterfaces/ChatDemo.js";
import ScrollPaneDemo from "./userInterfaces/ScrollPaneDemo.js";
import TreeViewDemo from "./userInterfaces/TreeViewDemo.js";
import Inventory from "./userInterfaces/Inventory.js";
import AnimationDemo from "./examples/webgl_animation_cloth.js"


export default class Main {


    constructor() {
        this.init();
    }

    init() {
        const info = wx.getSystemInfoSync();
        this.renderer = info.system.includes("iOS") ? new THREE.WebGL1Renderer({ antialias: true, canvas }) : new THREE.WebGLRenderer({ antialias: true, canvas });
        this.renderer.setClearColor(0X222222);
        this.renderer.sortObjects = false;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.localClippingEnabled = true;
        this.renderer.autoClear = false;
        this.renderer.shadowMap.enabled = true;
        window.renderer = this.renderer;

        this.scene = new THREE.Scene();
        fgui.Stage.init(this.renderer, { screenMode: "horizontal" });
        fgui.Stage.scene = this.scene;
        // fgui.UIConfig.packageFileExtension = "bin";
        fgui.UIContentScaler.scaleWithScreenSize(1136, 640, fgui.ScreenMatchMode.MatchWidthOrHeight);

        // let listener = new THREE.AudioListener();
        // fgui.Stage.camera.add(listener);
        // fgui.Stage.audioListener = listener;

        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/MainMenu").then(this.start.bind(this));

        this.animate();
    }

    start() {
        this._mainMenu = fgui.UIPackage.createObject("MainMenu", "Main").asCom;

        this._mainMenu.getChild("n1").onClick(() => {
            this.startDemo(BasicDemo);
        }, this);
        this._mainMenu.getChild("n2").onClick(() => {
            this.startDemo(TransitionDemo);
        }, this);
        this._mainMenu.getChild("n4").onClick(() => {
            this.startDemo(VirtualListDemo);
        }, this);
        this._mainMenu.getChild("n5").onClick(() => {
            this.startDemo(LoopListDemo);
        }, this);
        this._mainMenu.getChild("n6").onClick(() => {
            this.startDemo(HitTestDemo);
        }, this);
        this._mainMenu.getChild("n7").onClick(() => {
            this.startDemo(PullToRefreshDemo);
        }, this);
        this._mainMenu.getChild("n8").onClick(() => {
            this.startDemo(ModalWaitingDemo);
        }, this);
        this._mainMenu.getChild("n9").onClick(() => {
            this.startDemo(JoystickDemo);
        }, this);
        this._mainMenu.getChild("n10").onClick(() => {
            this.startDemo(BagDemo);
        }, this);
        this._mainMenu.getChild("n11").onClick(() => {
            this.startDemo(ChatDemo);
        }, this);
        this._mainMenu.getChild("n12").onClick(() => {
            this.startDemo(ListEffectDemo);
        }, this);
        this._mainMenu.getChild("n13").onClick(() => {
            this.startDemo(ScrollPaneDemo);
        }, this);
        this._mainMenu.getChild("n14").onClick(() => {
            this.startDemo(TreeViewDemo);
        }, this);
        this._mainMenu.getChild("n15").onClick(() => {
            this.startDemo(GuideDemo);
        }, this);
        this._mainMenu.getChild("n16").onClick(() => {
            this.startDemo(CooldownDemo);
        }, this);
        this._mainMenu.getChild("n17").onClick(() => {
            this.startDemo(Inventory);
        }, this);
        this._mainMenu.getChild("n23").onClick(() => {
            this.startDemo(AnimationDemo);
        }, this);

        this.showMainMenu();

    }

    showMainMenu() {
        this._mainMenu.makeFullScreen();
        fgui.GRoot.inst.addChild(this._mainMenu);
    }

    startDemo(demoClass) {
        fgui.GRoot.inst.removeChild(this._mainMenu);

        this._currentDemo = new demoClass();
        this._closeButton = fgui.UIPackage.createObject("MainMenu", "CloseButton");
        this._closeButton.setPosition(fgui.GRoot.inst.width - this._closeButton.width - 10, fgui.GRoot.inst.height - this._closeButton.height - 10);
        this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Right_Right);
        this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Bottom_Bottom);
        this._closeButton.sortingOrder = 100000;
        this._closeButton.onClick(this.onDemoClosed, this);
        fgui.GRoot.inst.addChild(this._closeButton);
    }

    onDemoClosed() {
        fgui.GRoot.inst.removeChildren(0, -1, true);
        if ('dispose' in this._currentDemo)
            this._currentDemo.dispose();

        this.showMainMenu();
    }

    render() {
        fgui.Stage.update();

        if(this._currentDemo&&this._currentDemo.scene&&this._currentDemo.camera){
            this._currentDemo.animate();
            this.renderer.clear();
            this.renderer.render(this._currentDemo.scene, this._currentDemo.camera);
        }
        this.renderer.render(fgui.Stage.scene, fgui.Stage.camera);
    }

    animate = () => {
        requestAnimationFrame(this.animate)
        this.render()
    }
}