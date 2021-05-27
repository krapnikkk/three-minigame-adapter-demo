export default class EmojiParser extends fgui.UBBParser {

    constructor() {
        super();

        const TAGS = ["88", "am", "bs", "bz", "ch", "cool", "dhq", "dn", "fd", "gz", "han", "hx", "hxiao", "hxiu"];

        TAGS.forEach(element => {
            this._handlers[":" + element] = this.onTag_Emoji;
        });
    }

    onTag_Emoji(tagName, end, attr) {
        return "<img src='ui://Chat/" + tagName.substr(1).toLowerCase() + "'/>";
    }
}