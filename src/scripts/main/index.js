console.log('app loaded')

class Test {
  state = {
    x: 1
  }

  constructor () {
    console.log('init Test class')
  }

  async write () {
    const a = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(5)
        }, 2000)
      })
    }

    console.log(this.state)

    const x = await a()
    console.log(x)
  }
}

const test = new Test()

console.log(test)

test.write()
