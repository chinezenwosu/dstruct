const Node = function(data) {
  this.data = data
  this.right = null
  this.left = null
}

const BinarySearchTree = function() {
  this.root = null
  this.add = (data) => {
    const node = this.root
    if (node === null) {
      this.root = new Node(data)
    } else {
      const searchTree = (node) => {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data)
            return
          } else {
            return searchTree(node).left
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data)
            return
          } else {
            return searchTree(node.right)
          }
        }
      }
      return searchTree(node)
    }
  }
  this.findMin = () => {
    let currentNode = this.root
    while (currentNode.left !== null) {
      currentNode = currentNode.left
    }
    console.log(currentNode)
    return currentNode.data
  }
  this.findMax = () => {
    let currentNode = this.root
    while (currentNode.right !== null) {
      currentNode = currentNode.right
    }
    return currentNode.data
  }
  this.find = (data) => {
    let currentNode = this.root
    while (currentNode && currentNode.data !== data) {
      if (data < currentNode.data) {
        currentNode = currentNode.left
      } else if (data > currentNode.data) {
        currentNode = currentNode.right
      }
    }
    
    return currentNode
  }
  this.isPresent = (data) => {
    const foundNode = this.find(data)
    return !!foundNode
  }
}

const bst = new BinarySearchTree()
bst.add(2)
bst.add(1)
bst.add(3)
bst.add(3)
console.log(bst)
console.log(bst.findMax())
console.log(bst.findMin())
console.log(bst.find(8))
console.log(bst.isPresent(8))
console.log(bst.find(3))
console.log(bst.isPresent(2))