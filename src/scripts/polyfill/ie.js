// Object Assign
if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, 'assign', {
    value: function assign (target) {
      'use strict'

      if (target === null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }

      let to = Object(target)

      for (let index = 1; index < arguments.length; index++) {
        let nextSource = arguments[index]

        if (nextSource !== null) {
          /* eslint-disable */
          for (let nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
          /* eslint-enable */
        }
      }

      return to
    },
    writable: true,
    configurable: true
  })
}

// Picture element
import 'picturefill'
import 'picturefill/dist/plugins/mutation/pf.mutation'

import 'function.name'
