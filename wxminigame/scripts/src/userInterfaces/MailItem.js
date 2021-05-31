export default class MailItem extends fgui.GButton {
    constructor() {
        super();
    }

    onConstruct() {
        this._timeText = this.getChild("timeText");
        this._readController = this.getController("IsRead");
        this._fetchController = this.getController("c1");
        this._trans = this.getTransition("t0");
    }

    setTime(value) {
        this._timeText.text = value;
    }

    setRead(value) {
        this._readController.selectedIndex = value ? 1 : 0;
    }

    setFetched(value) {
        this._fetchController.selectedIndex = value ? 1 : 0;
    }

    playEffect(delay) {
        this.visible = false;
        this._trans.play(null, 1, delay);
    }
}