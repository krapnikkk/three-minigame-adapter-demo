export default class CooldownDemo {

     constructor() {
        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/Cooldown").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("Cooldown", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._btn0 = this._view.getChild("b0");
        this._btn1 = this._view.getChild("b1");
        this._btn0.getChild("icon").icon = "https://krapnik.cn/three-minigame-adapter/Icons/k0.png";
        this._btn1.getChild("icon").icon = "https://krapnik.cn/three-minigame-adapter/Icons/k1.png";

        fgui.GTween.to(0, 100, 5).setTarget(this._btn0, "value").setRepeat(-1);
        fgui.GTween.to(10, 0, 10).setTarget(this._btn1, "value").setRepeat(-1);
    }
}
