import {TestWin } from "./TestWin.js"
export default class ModalWaitingDemo {
    constructor() {
        fgui.UIConfig.globalModalWaiting = "ui://ModalWaiting/GlobalModalWaiting";
        fgui.UIConfig.windowModalWaiting = "ui://ModalWaiting/WindowModalWaiting";

        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/ModalWaiting").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("ModalWaiting", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._testWin = new TestWin();
        this._testWin.center();
        this._view.getChild("n0").onClick(function () { 
            this._testWin.show(); 
        }, this);

        fgui.GRoot.inst.showModalWait();
        fgui.Timers.add(3000, 1, () => { fgui.GRoot.inst.closeModalWait(); });
    }
}