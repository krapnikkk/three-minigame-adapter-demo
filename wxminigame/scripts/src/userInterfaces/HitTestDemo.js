export default class HitTestDemo {
    constructor() {
        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/HitTest").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("HitTest", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);
    }
}