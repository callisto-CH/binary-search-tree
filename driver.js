function driver() {
  let arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }

  let tree = new Tree(arr);

  prettyPrint(tree.root);

  console.log(tree.isBalanced() ? "Tree is balanced" : "Tree is not balanced");

  console.log("Level order traversal:");
  tree.levelOrder(function (n) {
    console.log(n.value);
  });

  console.log("Level order recursive traversal:");
  tree.levelOrderRecur(function (n) {
    console.log(n.value);
  });

  console.log("Pre-order traversal:");
  tree.preOrder(function (n) {
    console.log(n.value);
  });

  console.log("Post-order traversal:");
  tree.postOrder(function (n) {
    console.log(n.value);
  });

  console.log("In-order traversal:");
  tree.inOrder(function (n) {
    console.log(n.value);
  });

  console.log("Adding 110, 150, 200, 220, 250, and 350 to tree");

  tree.insertNode(110);
  tree.insertNode(150);
  tree.insertNode(200);
  tree.insertNode(220);
  tree.insertNode(250);
  tree.insertNode(350);

  prettyPrint(tree.root);
  console.log(tree.isBalanced() ? "Tree is balanced" : "Tree is not balanced");

  console.log("Rebalancing");
  tree.rebalance();

  prettyPrint(tree.root);
  console.log(tree.isBalanced() ? "Tree is balanced" : "Tree is not balanced");

  console.log("Level order traversal:");
  tree.levelOrder(function (n) {
    console.log(n.value);
  });

  console.log("Level order recursive traversal:");
  tree.levelOrderRecur(function (n) {
    console.log(n.value);
  });

  console.log("Pre-order traversal:");
  tree.preOrder(function (n) {
    console.log(n.value);
  });

  console.log("Post-order traversal:");
  tree.postOrder(function (n) {
    console.log(n.value);
  });

  console.log("In-order traversal:");
  tree.inOrder(function (n) {
    console.log(n.value);
  });
}