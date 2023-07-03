const Stack = require('./stack')
const ChiSet = require('./set')

class DStruct {
  constructor() {
    const typeArg = this.getAllArgs()[0]
    this.showHelp = this.showHelp.bind(this)
    this.demoStack = this.demoStack.bind(this)
    this.validOptions = {
      help: {
        func: this.showHelp
      },
      set: {
        func: this.demoSet
      },
      stack: {
        func: this.demoStack,
        args: [{ type: 'p', usage: 'word for palindrome test' }]
      }
    }
    this.typeArg = this.validOptions[typeArg] ? typeArg : null
  }

  getFirstArg() {
    return process.argv.slice(2)[0]
  }

  getSecondArg() {
    return process.argv.slice(2)[1]
  }

  getAllArgs() {
    return process.argv
      .slice(2)
      .map((val, i) => {
        let object = {}
        let [regexForProp, regexForVal] = (() => [new RegExp('^(.+?)='), new RegExp('\=(.*)')] )()
        let [prop, value] = (() => [regexForProp.exec(val), regexForVal.exec(val)] )()
        if (!prop) {
          object = val
          return object
        } else {
          object[prop[1]] = value[1] 
          return object
        }
      })
  }

  
  showHelp() {
    if (!this.typeArg) {
      console.log('\x1b[31m%s\x1b[0m', 'Oops! You did not provide any valid options')
    } else {
      console.log('\x1b[36m%s\x1b[0m', 'Welcome to my amateur data structure demo')
    }
    console.log('\r')
    console.log('\x1b[37m%s\x1b[0m \x1b[32m%s\x1b[0m', 'To view this help menu, use this help command:', 'npm start help')
    Object.keys(this.validOptions).filter(option => option !== 'help').forEach(option => {
      const argsOptions = this.validOptions[option].args ? this.validOptions[option].args.map(arg => ` ${arg.type}={${arg.usage}}`) : ''
      console.log('\x1b[37m%s\x1b[0m \x1b[32m%s\x1b[0m', `To view the ${option} demo, use this ${option} command:`, `npm start ${option}${argsOptions}`)
    })
    console.log('\n')
  }

  demoStack() {
    // Implement palindrome
    const stack = new Stack()
    const word = this.getAllArgs()[1].p
    let rword = ''

    if (!word) {
      return console.log('\x1b[31m%s\x1b[0m', 'Please provide a word for palindrome test')
    }

    for (let i = 0; i < word.length; i++) {
      stack.push(word[i])
    }

    for (let i = 0; i < word.length; i++) {
      rword += stack.pop()
    }

    console.log('%s \x1b[36m%s\x1b[0m', 'Word:', word)
    console.log('%s \x1b[36m%s\x1b[0m', 'Reverse word:', rword)
    console.log('\x1b[36m%s\x1b[0m %s', rword, `is ${word === rword ? 'a' : 'not a'} palindrome`)
  }

  demoSet() {
    const set = new ChiSet()
    const set2 = new ChiSet()

    set.add('a')
    set.add('b')
    set.add('b')
    set.add('d')
    set.add('c')
    set.add('d')
    set2.add('1')
    set2.add('2')
    set2.add('a')
    set2.add('2')
    set2.add('4')
    set2.add('3')
    set2.add('4')
    console.log('set =================', set.values())
    console.log('set2 =================', set2.values())
    set.remove('d')
    console.log('set after removing d =================', set.values())
    const unionSet = set.union(set2)
    console.log('unionSet =================', unionSet.values())
    const intersectSet = set.intersect(set2)
    console.log('intersectSet =================', intersectSet.values())
    const differenceSet = set.difference(set2)
    const differenceSet2 = set2.difference(set)
    console.log('differenceSet =================', differenceSet.values())
    console.log('differenceSet2 =================', differenceSet2.values())
    const isSubSet = set.subset(set2)
    console.log('isSubSet =================', isSubSet)
    set.remove('b')
    set.remove('c')
    const isSubSetAgain = set.subset(set2)
    console.log('set after removal of b and c =================', set.values())
    console.log('isSubSet after removal of b and c =================', isSubSetAgain)
  }
  
  start() {
    const option = this.validOptions[this.typeArg || 'help']
    if (option && option.args && this.getAllArgs().length - 1 !== option.args.length) {
      console.log('\x1b[31m%s\x1b[0m', 'Oops! You need to provide the arguments in this format:')
      const argsOptions = option.args ? option.args.map(arg => ` ${arg.type}={${arg.usage}}`) : ''
      return console.log('\x1b[32m%s\x1b[0m', `npm start ${this.typeArg}${argsOptions}`)
    }
    option.func()
  }
}

const dStruct = new DStruct()
dStruct.start()
