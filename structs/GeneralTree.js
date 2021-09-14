class GeneralTree {
    constructor(name) {
        this.name = name;
        this.children = [];
    }
    addChild(child) {
        let child_tree = new GeneralTree(child);
        this.children.push(child_tree);
        return child_tree;
    }
    addChildLiteral(child) {
        this.children.push(child);
    }
    getChild(index) {
        return this.children[index];
    }
    getChildren() { return this.children; }
    getName() { return this.name; }
    printChildren() {
        console.log(this.children);
    }
}

module.exports = GeneralTree;