import './initialization/variables'

import polyfill from './polyfill'

polyfill(() => {
  import(/* webpackChunkName: "chunks/apps" */ './main/index')
})
