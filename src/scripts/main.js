import './initialization/variables'

import polyfill from './polyfill'

polyfill(async () => {
  // await import(/* webpackChunkName: "chunks/apps" */ './main/index')
  await import(/* webpackMode: "eager" */ './main/index')
})
