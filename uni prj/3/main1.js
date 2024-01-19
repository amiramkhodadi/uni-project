class Node {
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor(key, value = key) {
        this.root = new Node(key, value);
    }

    *inOrderTraversal(node = this.root) {
        if (node.left) yield* this.inOrderTraversal(node.left);
        yield node;
        if (node.right) yield* this.inOrderTraversal(node.right);
    }

    *postOrderTraversal(node = this.root) {
        if (node.left) yield* this.postOrderTraversal(node.left);
        if (node.right) yield* this.postOrderTraversal(node.right);
        yield node;
    }

    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.left) yield* this.preOrderTraversal(node.left);
        if (node.right) yield* this.preOrderTraversal(node.right);
    }

    insert(
        parentNodeKey,
        key,
        value = key,
        { left, right } = { left: true, right: true }
    ) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                const canInsertLeft = left && node.left === null;
                const canInsertRight = right && node.right === null;
                if (!canInsertLeft && !canInsertRight) return false;
                if (canInsertLeft) {
                    node.left = new Node(key, value, node);
                    return true;
                }
                if (canInsertRight) {
                    node.right = new Node(key, value, node);
                    return true;
                }
            }
        }
        return false;
    }
}
function removeNode(tree, key) {
    for (let node of tree.preOrderTraversal()) {
        if (node.left.key === key) {
            node.left = null;
            return true;
        }
        if (node.right.key === key) {
            node.right = null;
            return true;
        }
    }

    return false;
}

function countLeaves(tree) {
    let leaves = 0;
    for (const node of tree.preOrderTraversal()) {
        if (!node.left && !node.right) {
            leaves++;
        }
    }
    return leaves;
}
function countNodes(tree) {
    let nodes = 0;
    for (const node of tree.preOrderTraversal()) {
        nodes += 1;
    }
    return nodes;
}
function sumData(tree) {
    let sum = 0;
    for (const node of tree.preOrderTraversal()) {
        sum += node.value;
    }
    return sum;
}

function calculateDepth(tree) {
    if (!tree.root) {
        return 0;
    }
    let depth = 1;
    for (const node of tree.preOrderTraversal()) {
        depth = Math.max(depth, 1 + calculateDepth(node.left));
        depth = Math.max(depth, 1 + calculateDepth(node.right));
    }

    return depth;
}
function depth(root) {
    if (root == null) {
        return 0;
    }
    if (root.left == null && root.right == null) {
        return 1;
    }
    if (root.left == null) {
        return depth(root.right) + 1;
    }
    if (root.right == null) {
        return depth(root.left) + 1;
    }
    return Math.max(depth(root.left), depth(root.right)) + 1;
}

const tree = new BinaryTree(1, 5);

tree.insert(1, 2, 6);
tree.insert(1, 3, 7);
tree.insert(2, 5, 8, { right: true });
tree.insert(2, 4, 9, { left: true });
tree.insert(3, 7, 11, { right: true });
tree.insert(7, 14, 18);
tree.insert(7, 15, 13);
tree.insert(15, 30, 14);
tree.insert(5, 10, 15);
tree.insert(4, 9, 19, { left: true });

// removeNode(tree, 2);

const countLeave = countLeaves(tree);
const countNode = countNodes(tree);
const sumDat = sumData(tree);
const calculatDepth = depth(tree.root);

console.log(tree.root);

const showPreOrder = [...tree.preOrderTraversal()].map((x) => x.value);
const showInOrder = [...tree.inOrderTraversal()].map((x) => x.value);
const showPostOredr = [...tree.postOrderTraversal()].map((x) => x.value);

console.log(countLeave);
console.log(countNode);
console.log(sumDat);
console.log(calculatDepth);
console.log(showPostOredr);
console.log(showPreOrder);
console.log(showInOrder);
