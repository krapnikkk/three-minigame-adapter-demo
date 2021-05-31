export default class Inventory {
    constructor() {
        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/3DInventory").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("3DInventory", "Main").asCom;
        fgui.GRoot.inst.addChild(this._view);
        this._view.setScale(0.8,0.8);
        this._view.center();
    }

    dispose() {
        fgui.UIPackage.removePackage("3DInventory");
    }

}

