// Set has operations add, remove, contains, union, intersect, difference, subset, size

// Name this ChiSet because Es6 has a new Set class.

const ChiSet = function() {
  this.collection = []

  this.contains = (value) => {
    return this.collection.indexOf(value) > -1
  }

  this.add = (value) => {
    if (!this.contains(value)) {
      this.collection.push(value)
    }
  }

  this.remove = (value) => {
    if (this.contains(value)) {
      const index = this.collection.indexOf(value)
      this.collection.splice(index, 1)
    }
  }

  this.values = () => {
    return this.collection
  }

  this.size = () => {
    return this.collection.length()
  }

  // Get the union of the values
  this.union = (otherSet) => {
    const unionSet = new ChiSet()
    const firstCollection = this.values()
    const secondCollection = otherSet.values()

    firstCollection.forEach(element => {
      unionSet.add(element)
    })

    secondCollection.forEach(element => {
      unionSet.add(element)
    })

    return unionSet
  }

  // Get the common values
  this.intersect = (otherSet) => {
    const firstCollection = this.values()
    const intersectSet = new ChiSet()

    firstCollection.forEach(element => {
      if (otherSet.contains(element)) {
        intersectSet.add(element)
      }
    })

    return intersectSet
  }

  // Get the distinct values
  this.difference = (otherSet) => {
    const differenceSet = new ChiSet()
    const allCollections = this.union(otherSet).values()

    allCollections.forEach(element => {
      if (!otherSet.contains(element)) {
        differenceSet.add(element)
      }
    })

    return differenceSet
  }

  // Get the distinct values
  this.subset = (otherSet) => {
    const firstCollection = this.values()

    return firstCollection.every(value => otherSet.contains(value))
  }
}

module.exports = ChiSet
