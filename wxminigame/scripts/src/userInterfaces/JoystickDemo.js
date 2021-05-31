import JoystickModule, { JoystickMoving, JoystickUp } from "./JoystickModule.js";


export default class JoystickDemo {


    constructor() {
        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/Joystick").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("Joystick", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._text = this._view.getChild("n9");

        this._joystick = new JoystickModule(this._view);
        this._joystick.on(JoystickMoving, this.onJoystickMoving, this);
        this._joystick.on(JoystickUp, this.onJoystickUp, this);
    }

    onJoystickMoving(evt) {
        this._text.text = "" + evt.data;
    }

    onJoystickUp() {
        this._text.text = "";
    }
}