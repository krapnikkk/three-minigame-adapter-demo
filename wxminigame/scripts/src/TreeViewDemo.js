export default class TreeViewDemo {


     constructor() {
        fgui.UIPackage.loadPackage("https://krapnik.cn/three-minigame-adapter/TreeView").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("TreeView", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);
        this._fileURL = "ui://TreeView/file";

        this._tree1 = this._view.getChild("tree");
        this._tree1.on("click_item", this.__clickNode, this);
        this._tree2 = this._view.getChild("tree2");
        this._tree2.on("click_item", this.__clickNode, this);
        this._tree2.treeNodeRender = this.renderTreeNode.bind(this);

        var topNode = new fgui.GTreeNode(true);
        topNode.data = "I'm a top node";
        this._tree2.rootNode.addChild(topNode);
        for (var i = 0; i < 5; i++) {
            var node = new fgui.GTreeNode(false);
            node.data = "Hello " + i;
            topNode.addChild(node);
        }

        var aFolderNode = new fgui.GTreeNode(true);
        aFolderNode.data = "A folder node";
        topNode.addChild(aFolderNode);
        for (var i = 0; i < 5; i++) {
            var node = new fgui.GTreeNode(false);
            node.data = "Good " + i;
            aFolderNode.addChild(node);
        }

        for (var i = 0; i < 3; i++) {
            var node = new fgui.GTreeNode(false);
            node.data = "World " + i;
            topNode.addChild(node);
        }

        var anotherTopNode = new fgui.GTreeNode(false);
        anotherTopNode.data = ["I'm a top node too", "ui://TreeView/heart"];
        this._tree2.rootNode.addChild(anotherTopNode);
    }

     renderTreeNode(node, obj) {
        if (node.isFolder) {
            obj.text = node.data;
        }
        else if (node.data instanceof Array) {
            obj.icon = node.data[1];
            obj.text = node.data[0];
        }
        else {
            obj.icon = this._fileURL;
            obj.text = node.data;
        }
    }

     __clickNode(evt) {
        let itemObject = evt.data;
        var node = itemObject.treeNode;
        console.log(node.text);
    }
}
