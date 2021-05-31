import MailItem from "./MailItem.js";

export default class VirtualListDemo {

     constructor() {
        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/VirtualList").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        fgui.UIObjectFactory.setExtension("ui://VirtualList/mailItem", MailItem);

        this._view = fgui.UIPackage.createObject("VirtualList", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._view.getChild("n6").onClick(function () { this._list.addSelection(500, true); }, this);
        this._view.getChild("n7").onClick(function () { this._list.scrollPane.scrollTop(); }, this);
        this._view.getChild("n8").onClick(function () { this._list.scrollPane.scrollBottom(); }, this);

        this._list =this._view.getChild("mailList");
        this._list.setVirtual();

        this._list.itemRenderer = this.renderListItem.bind(this);
        this._list.numItems = 1000;
    }

    renderListItem(index, item) {
        item.setFetched(index % 3 == 0);
        item.setRead(index % 2 == 0);
        item.setTime("5 Nov 2015 16:24:33");
        item.title = index + " Mail title here";
    }
}

