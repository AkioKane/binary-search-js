import { Node } from "./node.js";

export class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
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
console.log(tree.prettyPrint(tree.root))