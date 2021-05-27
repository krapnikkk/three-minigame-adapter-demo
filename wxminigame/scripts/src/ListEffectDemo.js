import MailItem from "./MailItem.js";

export default class ListEffectDemo {


    constructor() {
        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/ListEffect").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        fgui.UIObjectFactory.setExtension("ui://ListEffect/mailItem", MailItem);
        this._view = fgui.UIPackage.createObject("ListEffect", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._list = this._view.getChild("mailList");
        for (var i = 0; i < 10; i++) {
            var item = this._list.addItemFromPool();
            item.setFetched(i % 3 == 0);
            item.setRead(i % 2 == 0);
            item.setTime("5 Nov 2015 16:24:33");
            item.title = "Mail title here";
        }

        this._list.ensureBoundsCorrect();
        var delay = 0;
        for (var i = 0; i < 10; i++) {
            var item = this._list.getChildAt(i);
            if (this._list.isChildInView(item)) {
                item.playEffect(delay);
                delay += 0.2;
            }
            else
                break;
        }
    }
}
