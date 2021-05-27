import EmojiParser from "./EmojiParser.js";
export default class ChatDemo {

    constructor() {
        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/Chat").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("Chat", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._messages = [];
        this._emojiParser = new EmojiParser();

        this._list = this._view.getChild("list");
        this._list.setVirtual();
        this._list.itemProvider = this.getListItemResource.bind(this);
        this._list.itemRenderer = this.renderListItem.bind(this);

        this._input = this._view.getChild("input1");
        this._input.on("submit", this.onSubmit, this);

        this._view.getChild("btnSend1").onClick(this.onClickSendBtn, this);
        this._view.getChild("btnEmoji1").onClick(this.onClickEmojiBtn, this);

        this._emojiSelectUI = fgui.UIPackage.createObject("Chat", "EmojiSelectUI").asCom;
        this._emojiSelectUI.getChild("list").on("click_item", this.onClickEmoji, this);
    }

    addMsg(sender, senderIcon, msg, fromMe) {
        let isScrollBottom = this._list.scrollPane.isBottomMost;

        let newMessage = {};
        newMessage.sender = sender;
        newMessage.senderIcon = senderIcon;
        newMessage.msg = msg;
        newMessage.fromMe = fromMe;
        this._messages.push(newMessage);

        if (newMessage.fromMe) {
            if (this._messages.length == 1 || Math.random() < 0.5) {
                let replyMessage = {};
                replyMessage.sender = "FairyGUI";
                replyMessage.senderIcon = "r1";
                replyMessage.msg = "Today is a good day. [:gz]";
                replyMessage.fromMe = false;
                this._messages.push(replyMessage);
            }
        }

        if (this._messages.length > 100)
            this._messages.splice(0, this._messages.length - 100);

        this._list.numItems = this._messages.length;

        if (isScrollBottom)
            this._list.scrollPane.scrollBottom();
    }

    getListItemResource(index) {
        let msg = this._messages[index];
        if (msg.fromMe)
            return "ui://Chat/chatRight";
        else
            return "ui://Chat/chatLeft";
    }

    renderListItem(index, item) {
        let msg = this._messages[index];
        if (!msg.fromMe)
            item.getChild("name").text = msg.sender;
        item.icon = "ui://Chat/" + msg.senderIcon;
        item.getChild("msg").text = this._emojiParser.parse(msg.msg);
    }

    onClickSendBtn() {
        let msg = this._input.text;
        if (!msg)
            return;

        this.addMsg("Creator", "r0", msg, true);
        this._input.text = "";
    }

    onClickEmojiBtn(evt) {
        fgui.GRoot.inst.showPopup(this._emojiSelectUI, fgui.GObject.cast(evt.sender), fgui.PopupDirection.Up);
    }

    onClickEmoji(evt) {
        let item = evt.data;
        this._input.text += "[:" + item.text + "]";
    }

    onSubmit() {
        this.onClickSendBtn();
    }
}