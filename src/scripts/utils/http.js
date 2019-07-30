import { GMAP_URL, DEFAULT_AJAX_OPTS } from './variables';
import { wait } from './index';
import { lang } from './layout';

const SCRIPT_CACHED = {};

function getScript (src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');

    script.async = true;
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

export function loadScript (url) {
  if (!SCRIPT_CACHED[url]) {
    SCRIPT_CACHED[url] = getScript(url);
  }

  return SCRIPT_CACHED[url];
}

export function callApi (opts) {
  return new Promise((resolve, reject) => {
    const isString = typeof opts === 'string';

    let options = {
      ...DEFAULT_AJAX_OPTS,
      data: {},
      url: isString ? opts : ''
    };

    if (!isString) {
      options = { ...options, ...opts };
    }

    if (!options.data.lang) {
      options.data.lang = lang;
    }

    $.ajax(options).done(resolve).fail(reject);
  });
}

export async function loadMapApi () {
  await loadScript(GMAP_URL);

  return window.google.maps;
}

export async function download (url, fileName = '') {
  if (!url) {
    return;
  }

  const $link = $('<a />', {
    href: url,
    download: fileName,
    style: 'display:none'
  });

  $link
    .on('click', e => e.stopImmediatePropagation())
    .appendTo('body')[0]
    .click();

  await wait();

  $link.remove();
}
