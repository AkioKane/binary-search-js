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

tree.insert(12, array)
tree.deleteItem(12)

console.log(tree.find(324))
console.log(tree.prettyPrint(tree.root))
// console.log(tree.levelOrder())
// console.log(tree.inOrder())
// console.log(tree.preOrder())
// console.log(tree.postOrder())