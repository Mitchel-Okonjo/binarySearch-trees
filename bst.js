class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(root) {
    this.root = root;
  }

  insert(value) {
    if (!this.root) return;
    let current = this.root;
    const node = new Node(value);

    while (true) {
      if (node.data < current.data) {
        if (!current.left) {
          current.left = node;
          return;
        }
        current = current.left;
        continue;
      } else {
        if (!current.right) {
          current.right = node;
          return;
        }
        current = current.right;
        continue;
      }
    }
  }
}

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) return null;

  const mid = parseInt((start + end) / 2);
  const root = new Node(arr[mid]);

  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);

  return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const newArr = [...new Set([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])];
newArr.sort((a, b) => a - b);
prettyPrint(buildTree(newArr));

const nums = new Tree(buildTree(newArr));
prettyPrint(nums.root);
nums.insert(2);
prettyPrint(nums.root);
