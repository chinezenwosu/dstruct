// Stack has operations pop, push, size, peek

const Stack = function() {
  this.count = 0
  this.storage = {}

  this.push = (item) => {
    this.storage[this.count] = item
    this.count++
  }

  this.pop = () => {
    if (this.count === 0) {
      return
    }
    this.count--
    const lastItem = this.storage[this.count]
    delete this.storage[this.count]
    return lastItem
  }

  this.size = () => {
    return this.count
  }

  this.peek = () => {
    return this.storage[this.count - 1]
  }
}

// Initialize stack
const stack = new Stack()