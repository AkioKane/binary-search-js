import { Node } from "./node.js";

export class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
    this.copyArray = arr;
  }

  buildTree(array) {
    const sortedArray = [... new Set(array)].sort((a, b) => a - b);

    function createTree(start, end) {
      if (start > end) {
        return null;
      }

      const mid = Math.floor((start + end) / 2);
      const node = new Node(sortedArray[mid]);

      node.left = createTree(start, mid - 1);
      node.right = createTree(mid + 1, end);

      return node;
    }
    return createTree(0, sortedArray.length - 1)
  }

  insert(key) {
    this.copyArray.push(key);
    
    return this.root = this.buildTree(this.copyArray);
  }

  deleteItem(key) {
    const index = this.copyArray.indexOf(key)
    this.copyArray.splice(index, 1);

    return this.root = this.buildTree(this.copyArray);
  }

  find(key) {
    function SearchNode(node, key) {
      if (node === null) {
        return null;
      }

      if (key === node.data) {
        return node;
      }

      if (key < node.data) {
        return SearchNode(node.left, key);
      } else if (key > node.data) {
        return SearchNode(node.right, key);
      }
    }

    return SearchNode(this.root, key);
  }

  levelOrder(callback) {
    const queue = [this.root];
    const levelList = [];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback ? callback(currentNode) : levelList.push(currentNode.data);

      const attributes = [
        currentNode?.left,
        currentNode?.right
      ].filter((value) => value);
      queue.push(...attributes)
    }
    
    if (levelList.length > 0) return levelList;
  }

  inOrder(callback, node = this.root, inOrderList = []) {
    if (node === null) return;

    this.inOrder(callback, node.left, inOrderList);
    callback ? callback(node) : inOrderList.push(node.data);
    this.inOrder(callback, node.right, inOrderList);

    if (inOrderList.length > 0) return inOrderList;
  }

  preOrder(callback, node = this.root, inOrderList = []) {
    if (node === null) return;

    callback ? callback(node) : inOrderList.push(node.data);
    this.inOrder(callback, node.left, inOrderList);
    this.inOrder(callback, node.right, inOrderList);

    if (inOrderList.length > 0) return inOrderList;
  }

  postOrder(callback, node = this.root, inOrderList = []) {
    if (node === null) return;

    this.inOrder(callback, node.left, inOrderList);
    this.inOrder(callback, node.right, inOrderList);
    callback ? callback(node) : inOrderList.push(node.data);

    if (inOrderList.length > 0) return inOrderList;
  }

  height(node) {
    if (node === null) return 0;

    const leftChild = this.height(node.left)
    const rightChild = this.height(node.right)

    return Math.max(leftChild, rightChild) + 1;
  }

  depth(node) {
    if (node === null) return 0;

    function SearchDepth(root, node, index = 1) {
      if (root === null) {
        return null;
      }
      
      if (node === root.data) {
        return index;
      }

      if (node < root.data) {
        return SearchDepth(root.left, node, index+1);
      } else if (node > root.data) {
        return SearchDepth(root.right, node, index+1);
      }
    }

    return SearchDepth(this.root, node.data);
  }

  isBalanced() {

  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
    return this;
  }
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

const tree = new Tree(array);

tree.insert(12)
tree.insert(15)
tree.insert(17)
tree.insert(19)
tree.insert(155)
tree.insert(115)
tree.deleteItem(12)

console.log(tree.find(324))
console.log(tree.prettyPrint(tree.root))

console.log("\nOrders tree: ")
console.log(tree.levelOrder())
console.log(tree.inOrder())
console.log(tree.preOrder())
console.log(tree.postOrder())

const nodeHeight = tree.find(5)
console.log("\nHeight node 5: " + tree.height(nodeHeight))
console.log("Depth node 5: " + tree.depth(nodeHeight))