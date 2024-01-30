function height(node) {
    if (node === null) {
        return -1;
    }
    return node.ht;
}

function updateHeight(node) {
    node.ht = Math.max(height(node.left), height(node.right)) + 1;
}

function balanceFactor(node) {
    return height(node.left) - height(node.right);
}

function rotateRight(node) {
    var newRoot = node.left;
    node.left = newRoot.right;
    newRoot.right = node;
    updateHeight(node);
    updateHeight(newRoot);
    return newRoot;
}

function rotateLeft(node) {
    var newRoot = node.right;
    node.right = newRoot.left;
    newRoot.left = node;
    updateHeight(node);
    updateHeight(newRoot);
    return newRoot;
}

function balance(node) {
    var bf = balanceFactor(node);
    if (bf > 1) {
        if (balanceFactor(node.left) < 0) {
            node.left = rotateLeft(node.left);
        }
        node = rotateRight(node);
    } else if (bf < -1) {
        if (balanceFactor(node.right) > 0) {
            node.right = rotateRight(node.right);
        }
        node = rotateLeft(node);
    }
    return node;
}

function insert(node, val) {
    if (node === null) {
        return { val: val, left: null, right: null, ht: 0 };
    }
    if (val < node.val) {
        node.left = insert(node.left, val);
    } else if (val > node.val) {
        node.right = insert(node.right, val);
    }
    updateHeight(node);
    return balance(node);
}

function printTree(node) {
    if (node !== null) {
        printTree(node.left);
        console.log(node.val + "(BF=" + balanceFactor(node) + ")");
        printTree(node.right);
    }
}

function processData(input) {
    var data = input.split('\n').map(Number);
    var n = data[0];
    var root = null;
    for (var i = 1; i <= n; i++) {
        root = insert(root, data[i]);
    }
    printTree(root);
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
