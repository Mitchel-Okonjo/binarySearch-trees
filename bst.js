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

  delete(value) {
    if (!this.root) return;
    let current = this.root;
    let parent = null;

    while (current) {
      if (value < current.data) {
        parent = current;
        current = current.left;
        continue;
      } else if (value > current.data) {
        parent = current;
        current = current.right;
        continue;
      } else {
        if (!current.left && !current.right) {
          if (!parent) {
            // Special case: deleting the root node
            this.root = null;
          } else if (parent.left === current) {
            parent.left = null;
          } else {
            parent.right = null;
          }
          break;
        } else if (current.left && !current.right) {
          if (!parent) {
            // Special case: deleting the root node
            this.root = null;
          } else if (parent.left === current) {
            parent.left = current.left;
          } else {
            parent.right = current.left;
          }
          break;
        } else if (!current.left && current.right) {
          if (!parent) {
            // Special case: deleting the root node
            this.root = null;
          } else if (parent.left === current) {
            parent.left = current.right;
          } else {
            parent.right = current.right;
          }
          break;
        } else {
          let minNode = current.right;
          let minNodeParent = current;

          while (minNode.left) {
            minNodeParent = minNode;
            minNode = minNode.left;
          }
          current.data = minNode.data;
          if (minNodeParent.left === minNode) {
            minNodeParent.left = minNode.right;
          } else {
            minNodeParent.right = minNode.right;
          }
          break;
        }
      }
    }
  }

  find(value, root = this.root) {
    if (root === null) return null;

    if (value < root.data) {
      return this.find(value, root.left);
    } else if (value > root.data) {
      return this.find(value, root.right);
    } else {
      return root;
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

const nums = new Tree(buildTree(newArr));
prettyPrint(nums.root);
nums.insert(2);
nums.insert(100);
nums.insert(99);
prettyPrint(nums.root);
nums.delete(99);
prettyPrint(nums.root);
console.log(nums.find(3));
console.log(nums.find(67));
