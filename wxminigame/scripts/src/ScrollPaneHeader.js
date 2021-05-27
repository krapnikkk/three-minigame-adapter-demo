export default class ScrollPaneHeader extends fgui.GComponent {

    constructor() {
        super();
    }

    onConstruct() {
        this._c1 = this.getController("c1");
        this.on("size_changed", this.onSizeChanged, this);
    }

    onSizeChanged() {
        if (this._c1.selectedIndex == 2 || this._c1.selectedIndex == 3)
            return;

        if (this.height > this.sourceHeight)
            this._c1.selectedIndex = 1;
        else
            this._c1.selectedIndex = 0;
    }

    get readyToRefresh() {
        return this._c1.selectedIndex == 1;
    }

    setRefreshStatus(value) {
        this._c1.selectedIndex = value;
    }
}
