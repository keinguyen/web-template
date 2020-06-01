console.log('app loaded')

function Decorator (Class) {
  console.log(0)
  // const
  return Class
}

@Decorator
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
console.log(test.x?.y ?? 5)

test.write()
