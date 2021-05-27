export class TestWin extends fgui.Window {

    constructor() {
        super();
    }

    onInit() {
        this.contentPane = fgui.UIPackage.createObject("ModalWaiting", "TestWin").asCom;
        this.contentPane.getChild("n1").onClick(this.onClickStart, this);
    }

    onClickStart() {
        this.showModalWait();
        fgui.GTween.delayedCall(3).onComplete(() => { this.closeModalWait(); }, this);
    }
}


export class WindowA extends fgui.Window {
    constructor() {
        super();
    }

    onInit() {
        this.contentPane = fgui.UIPackage.createObject("Basics", "WindowA").asCom;
        this.center();
    }

    onShown() {
        var list = this.contentPane.getChild("n6");
        list.removeChildrenToPool();

        for (var i = 0; i < 6; i++) {
            var item = list.addItemFromPool();
            item.title = "" + i;
            item.icon = fgui.UIPackage.getItemURL("Basics", "r4");
        }
    }
}

export class WindowB extends fgui.Window {
    constructor() {
        super();
    }

    onInit() {
        this.contentPane = fgui.UIPackage.createObject("Basics", "WindowB").asCom;
        this.center();

        this.setPivot(0.5, 0.5);
    }

    doShowAnimation() {
        this.setScale(0.1, 0.1);
        fgui.GTween.to2(0.1, 0.1, 1, 1, 0.3)
            .setTarget(this, this.setScale)
            .setEase(fgui.EaseType.QuadOut)
            .onComplete(this.onShown, this);
    }

    doHideAnimation() {
        fgui.GTween.to2(1, 1, 0.1, 0.1, 0.3)
            .setTarget(this, this.setScale)
            .setEase(fgui.EaseType.QuadOut)
            .onComplete(this.hideImmediately, this);
    }

    onShown() {
        this.contentPane.getTransition("t1").play();
    }

    onHide() {
        this.contentPane.getTransition("t1").stop();
    }
}
