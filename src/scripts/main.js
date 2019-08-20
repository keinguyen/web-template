// Remove below polyfill if support IE > 10
import _Promise from 'es6-promise';
_Promise.polyfill();

const { staticJsAssetsPath } = window;

if (staticJsAssetsPath) {
  __webpack_require__.p = staticJsAssetsPath;
}

async function initJS () {
  if (document.documentElement.classList.contains('ie')) {
    await import(/* webpackChunkName: "chunks/ie-polyfill" */ './polyfill/ie');
  }

  import(/* webpackChunkName: "chunks/apps" */ './main/index');
}

initJS();
