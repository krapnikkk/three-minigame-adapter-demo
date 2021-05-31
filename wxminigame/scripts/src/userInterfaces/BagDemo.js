export default class BagDemo {

    constructor() {
        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/Bag").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("Bag", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._bagWindow = new BagWindow();
        this._view.getChild("bagBtn").onClick(() => { this._bagWindow.show(); }, this);
    }

    dispose() {
        fgui.UIPackage.removePackage("Bag");
    }
}

class BagWindow extends fgui.Window {
    constructor() {
        super();
    }

    onInit() {
        this.contentPane = fgui.UIPackage.createObject("Bag", "BagWin").asCom;
        this.center();
    }

    onShown() {
        var list = this.contentPane.getChild("list");
        list.on("click_item", this.onClickItem, this);
        list.itemRenderer = this.renderListItem.bind(this);
        list.setVirtual();
        list.numItems = 45;
    }

    renderListItem(index, obj) {
        obj.icon = "https://krapnik.cn/three-minigame-adapter/Icons/i" + Math.floor(Math.random() * 10) + ".png";
        obj.text = "" + Math.floor(Math.random() * 100);
    }

    onClickItem(evt) {
        let item = evt.data;
        this.contentPane.getChild("n11").icon = item.icon;
        this.contentPane.getChild("n13").text = item.text;
    }
}