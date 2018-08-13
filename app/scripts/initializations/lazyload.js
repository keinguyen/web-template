import Blazy from 'blazy';

// Create loaded event
const lazyLoaded = document.createEvent('HTMLEvents');
lazyLoaded.initEvent('lazy-loaded', true, true);
// Create error event
const lazyError = document.createEvent('HTMLEvents');
lazyError.initEvent('lazy-error', true, true);

function init () {
  if (window.blazy) {
    return;
  }

  window.blazy = new Blazy({
    selector: '[data-lazy]',
    successClass: 'lazy-loaded',
    success (el) {
      el.dispatchEvent(lazyLoaded);
    },
    errorClass: 'lazy-err',
    error (el) {
      el.dispatchEvent(lazyError);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
