
export const JoystickMoving = "JoystickMoving";
export const JoystickUp = "JoystickUp";

export default class JoystickModule extends fgui.EventDispatcher {


    constructor(mainView) {
        super();

        this._button = mainView.getChild("joystick");
        this._button.changeStateOnClick = false;
        this._thumb = this._button.getChild("thumb");
        this._touchArea = mainView.getChild("joystick_touch");
        this._center = mainView.getChild("joystick_center");

        this._InitX = this._center.x + this._center.width / 2;
        this._InitY = this._center.y + this._center.height / 2;
        this._touchId = -1;
        this.radius = 150;

        this._curPos = new THREE.Vector2();

        this._touchArea.on("touch_begin", this.onTouchDown, this);
        this._touchArea.on("touch_move", this.onTouchMove, this);
        this._touchArea.on("touch_end", this.onTouchEnd, this);
    }

    trigger(evt) {
        this.onTouchDown(evt);
    }

    onTouchDown(evt) {
        console.log("onTouchDown")
        if (this._touchId == -1) {//First touch
            this._touchId = evt.input.touchId;

            if (this._tweener != null) {
                this._tweener.kill();
                this._tweener = null;
            }

            fgui.GRoot.inst.globalToLocal(evt.input.x, evt.input.y, this._curPos);
            var bx = this._curPos.x;
            var by = this._curPos.y;
            this._button.selected = true;

            if (bx < 0)
                bx = 0;
            else if (bx > this._touchArea.width)
                bx = this._touchArea.width;

            if (by > fgui.GRoot.inst.height)
                by = fgui.GRoot.inst.height;
            else if (by < this._touchArea.y)
                by = this._touchArea.y;

            this._lastStageX = bx;
            this._lastStageY = by;
            this._startStageX = bx;
            this._startStageY = by;

            this._center.visible = true;
            this._center.setPosition(bx - this._center.width / 2, by - this._center.height / 2);
            this._button.setPosition(bx - this._button.width / 2, by - this._button.height / 2);

            var deltaX = bx - this._InitX;
            var deltaY = by - this._InitY;
            var degrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            this._thumb.rotation = degrees + 90;

            evt.captureTouch();
        }
    }

    onTouchMove(evt) {
        if (this._touchId != -1 && evt.input.touchId == this._touchId) {
            fgui.GRoot.inst.globalToLocal(evt.input.x, evt.input.y, this._curPos);
            var bx = this._curPos.x;
            var by = this._curPos.y;
            var moveX = bx - this._lastStageX;
            var moveY = by - this._lastStageY;
            this._lastStageX = bx;
            this._lastStageY = by;
            var bx = this._button.x + moveX;
            var by = this._button.y + moveY;

            var offsetX = bx + this._button.width / 2 - this._startStageX;
            var offsetY = by + this._button.height / 2 - this._startStageY;

            var rad = Math.atan2(offsetY, offsetX);
            var degree = rad * 180 / Math.PI;
            this._thumb.rotation = degree + 90;

            var maxX = this.radius * Math.cos(rad);
            var maxY = this.radius * Math.sin(rad);
            if (Math.abs(offsetX) > Math.abs(maxX))
                offsetX = maxX;
            if (Math.abs(offsetY) > Math.abs(maxY))
                offsetY = maxY;

            bx = this._startStageX + offsetX;
            by = this._startStageY + offsetY;
            if (bx < 0)
                bx = 0;
            if (by > fgui.GRoot.inst.height)
                by = fgui.GRoot.inst.height;

            this._button.setPosition(bx - this._button.width / 2, by - this._button.height / 2);

            this.dispatchEvent(JoystickMoving, degree);
        }
    }

    onTouchEnd(evt) {
        if (this._touchId != -1 && evt.input.touchId == this._touchId) {
            this._touchId = -1;
            this._thumb.rotation = this._thumb.rotation + 180;
            this._center.visible = false;
            this._tweener = fgui.GTween.to2(this._button.x, this._button.y, this._InitX - this._button.width / 2, this._InitY - this._button.height / 2, 0.3)
                .setTarget(this._button, this._button.setPosition)
                .setEase(fgui.EaseType.CircOut)
                .onComplete(this.onTweenComplete, this);

            this.dispatchEvent(JoystickUp);
        }
    }

    onTweenComplete() {
        this._tweener = null;
        this._button.selected = false;
        this._thumb.rotation = 0;
        this._center.visible = true;
        this._center.x = this._InitX - this._center.width / 2;
        this._center.y = this._InitY - this._center.height / 2;
    }
}
