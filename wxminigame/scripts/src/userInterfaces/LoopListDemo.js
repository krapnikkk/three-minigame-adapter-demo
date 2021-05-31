export default class LoopListDemo {
    constructor() {
        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/LoopList").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("LoopList", "Main").asCom;
        this._view.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
        fgui.GRoot.inst.addChild(this._view);

        this._list = this._view.getChild("list");
        this._list.setVirtualAndLoop();

        this._list.itemRenderer = this.renderListItem.bind(this);
        this._list.numItems = 5;
        this._list.on("scroll", this.doSpecialEffect, this);
        this.doSpecialEffect();
    }

    doSpecialEffect() {
        //change the scale according to the distance to the middle
        var midX = this._list.scrollPane.posX + this._list.viewWidth / 2;
        var cnt = this._list.numChildren;
        for (var i = 0; i < cnt; i++) {
            var obj = this._list.getChildAt(i);
            var dist = Math.abs(midX - obj.x - obj.width / 2);
            if (dist > obj.width) //no intersection
                obj.setScale(1, 1);
            else {
                var ss = 1 + (1 - dist / obj.width) * 0.24;
                obj.setScale(ss, ss);
            }
        }

        this._view.getChild("n3").text = "" + ((this._list.getFirstChildInView() + 1) % this._list.numItems);
    }

    renderListItem(index, item) {
        item.setPivot(0.5, 0.5);
        item.icon = fgui.UIPackage.getItemURL("LoopList", "n" + (index + 1));
    }
}

