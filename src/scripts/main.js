const { staticJsAssestPath } = window;

if (staticJsAssestPath) {
  __webpack_require__.p = staticJsAssestPath;
}

async function initJS () {
  const { documentElement: { classList } } = document;

  if (classList.contains('ie')) {
    await import(/* webpackChunkName: "chunks/ie-polyfill" */ './polyfill/ie');
  }

  import(/* webpackChunkName: "chunks/apps" */ './main/index');
}

initJS();
