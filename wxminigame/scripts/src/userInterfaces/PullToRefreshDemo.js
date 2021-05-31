import ScrollPaneHeader from "./ScrollPaneHeader.js";

export default class PullToRefreshDemo {

     constructor() {
        fgui.UIObjectFactory.setExtension("ui://PullToRefresh/Header", ScrollPaneHeader);
        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/PullToRefresh").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("PullToRefresh", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._list1 = this._view.getChild("list1");
        this._list1.itemRenderer = this.renderListItem1.bind(this);
        this._list1.setVirtual();
        this._list1.numItems = 1;
        this._list1.on("pull_down_release", this.onPullDownToRefresh, this);

        this._list2 = this._view.getChild("list2");
        this._list2.itemRenderer = this.renderListItem2.bind(this);
        this._list2.setVirtual();
        this._list2.numItems = 1;
        this._list2.on("pull_up_release", this.onPullUpToRefresh, this);
    }

    renderListItem1(index, item) {
        item.text = "Item " + (this._list1.numItems - index - 1);
    }

    renderListItem2(index, item) {
        item.text = "Item " + index;
    }

    onPullDownToRefresh() {
        let header = this._list1.scrollPane.header;
        if (header.readyToRefresh) {
            header.setRefreshStatus(2);
            this._list1.scrollPane.lockHeader(header.sourceHeight);

            //Simulate a async resquest
            fgui.Timers.add(2000, 1, () => { this.simulateAsynWorkFinished(); });
        }
    }

    onPullUpToRefresh() {
        let footer = this._list2.scrollPane.footer.asCom;

        footer.getController("c1").selectedIndex = 1;
        this._list2.scrollPane.lockFooter(footer.sourceHeight);

        //Simulate a async resquest
        fgui.Timers.add(2000, 1, () => { this.simulateAsynWorkFinished2(); });
    }

    simulateAsynWorkFinished() {
        this._list1.numItems += 5;

        //Refresh completed
        let header = this._list1.scrollPane.header;
        header.setRefreshStatus(3);
        this._list1.scrollPane.lockHeader(35);

        fgui.Timers.add(2000, 1, () => { this.simulateHintFinished(); });
    }

    simulateHintFinished() {
        if (this._view.isDisposed)
            return;
        let header = this._list1.scrollPane.header;
        header.setRefreshStatus(0);
        this._list1.scrollPane.lockHeader(0);
    }

    simulateAsynWorkFinished2() {
        if (this._view.isDisposed)
            return;
        this._list2.numItems += 5;

        //Refresh completed
        let footer = this._list2.scrollPane.footer.asCom;
        footer.getController("c1").selectedIndex = 0;
        this._list2.scrollPane.lockFooter(0);
    }
}

