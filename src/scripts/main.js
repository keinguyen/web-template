const { staticJsAssestPath } = window;

if (staticJsAssestPath) {
  __webpack_require__.p = staticJsAssestPath;
}

async function initJS () {
  const { documentElement: { classList } } = document;

  if (classList.contains('ie')) {
    await import(/* webpackChunkName: "ie-polyfill" */ './polyfill/ie');
  }

  import(/* webpackChunkName: "apps" */ './main/index');
}

initJS();
