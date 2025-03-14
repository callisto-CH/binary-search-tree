class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = Tree.buildTree(arr, false);
  }

  static buildTree(arr, cleaned, start = 0, end = arr.length - 1) {
    if (!cleaned) {
      arr = mergeSort([...new Set(arr)]);
      end = arr.length - 1;
    }

    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);
    root.left = Tree.buildTree(arr, true, start, mid - 1);
    root.right = Tree.buildTree(arr, true, mid + 1, end);

    return root;
  }

  insertNode(value) {
    let current = this.root;
    let searching = true;
    while (searching) {
      if (value < current.value) {
        if (!current.left) {
          current.left = new Node(value);
          searching = false;
        }
        current = current.left;
      }
      if (value > current.value) {
        if (!current.right) {
          current.right = new Node(value);
          searching = false;
        }
        current = current.right;
      }
      if (value == current.value) return null;
    }
  }

  deleteNode(value) {
    let target = this.root;
    let parent = null;
    let searching = true;
    while (searching) {
      if (value < target.value) {
        if (!target.left) return null;
        parent = target;
        target = target.left;
      }
      if (value > target.value) {
        if (!target.right) return null;
        parent = target;
        target = target.right;
      }
      if (value == target.value || this.root == null) searching = false;
    }

    let parentToTarget = parent
      ? target.value < parent.value
        ? "left"
        : "right"
      : null;
    let numOfChildren = 0;
    if (target.left) numOfChildren += 1;
    if (target.right) numOfChildren += 1;

    // leaf case
    if (numOfChildren == 0) {
      if (parent) {
        parent[parentToTarget] = null;
      } else {
        this.root = null; // removing root case
      }
    }

    // 1 child case
    if (numOfChildren == 1) {
      let [child, targetToChild] = target.left
        ? [target.left, "left"]
        : [target.right, "right"];
      if (parent) {
        parent[parentToTarget] = child;
      } else {
        this.root = child; // removing root case
      }
      target[targetToChild] = null;
    }

    // 2 children case
    if (numOfChildren == 2) {
      let nextBiggest = target.right;
      while (nextBiggest.left) {
        nextBiggest = nextBiggest.left;
      }

      let replacementValue = nextBiggest.value;
      this.deleteNode(replacementValue);
      target.value = replacementValue;
    }
    return target;
  }

  find(value) {
    let current = this.root;
    while (true) {
      if (current == null) return null;
      if (value == current.value) return current;
      current = value < current.value ? current.left : current.right;
    }
  }

  levelOrder(callback) {
    if (!callback)
      throw new Error("Callback not provided for Tree.prototype.levelOrder()");
    if (this.root == null) return null;
    let q = [];
    q.push(this.root);
    while (q.length > 0) {
      callback(q[0]);
      if (q[0].left) q.push(q[0].left);
      if (q[0].right) q.push(q[0].right);
      q.shift();
    }
  }

  levelOrderRecur(callback, arr = [this.root]) {
    if (!callback)
      throw new Error(
        "Callback not provided for Tree.prototype.levelOrderRecur()"
      );
    if (this.root == null) return null;

    if (arr.length == 0) return;
    let nextLevel = [];
    for (const node of arr) {
      callback(node);
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    }
    this.levelOrderRecur(callback, nextLevel);
  }

  preOrder(callback, node = this.root) {
    if (!callback)
      throw new Error("Callback not provided for Tree.prototype.preOrder()");
    if (node == null) return;
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  inOrder(callback, node = this.root) {
    if (!callback)
      throw new Error("Callback not provided for Tree.prototype.inOrder()");
    if (node == null) return;
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!callback)
      throw new Error("Callback not provided for Tree.prototype.postOrder()");
    if (node == null) return;
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node) {
    if (!node) return null;

    let height = 0;
    let level = [node];
    let nextLevel = [];
    while (true) {
      for (const node of level) {
        nextLevel.push(node.left, node.right);
      }
      nextLevel = nextLevel.filter((x) => x);
      if (nextLevel.length > 0) {
        height += 1;
        level = nextLevel;
        nextLevel = [];
      } else {
        return height;
      }
    }
  }

  depth(node) {
    return node ? this.height(this.root) - this.height(node) : null;
  }

  isBalanced() {
    if (this.root == null) return true;
    let balanced = true;
    this.preOrder((node) => {
      if (!balanced) return;
      let leftHeight = node.left ? this.height(node.left) + 1 : 0;
      let rightHeight = node.right ? this.height(node.right) + 1 : 0;
      if (Math.abs(leftHeight - rightHeight) > 1) {
        balanced = false;
      }
    });
    return balanced;
  }

  rebalance() {
    let arr = [];
    this.inOrder((node) => arr.push(node.value));
    this.root = Tree.buildTree(arr, true);
  }
}
