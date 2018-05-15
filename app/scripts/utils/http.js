import {
  getType
} from './variables';

import {
  lang
} from './layout'

const {
  jQuery: $
} = window;

const scriptLoader = {};

const getScript = (src, callback) => {
  let script = document.createElement('script');

  script.async = true;
  script.src = src;

  script.addEventListener('load', function () {
    document.head.removeChild(script);
    typeof callback === 'function' && callback();
  });

  document.head.appendChild(script);
};

export const fetchData = (opts = {}) => {
  let defaultOpts = {
    cache: false
  };

  if (opts.data) {
    switch (getType(opts.data)) {
      case 'object':
        opts.data.lang = lang;
        break;
      case 'string':
        opts.data = `${opts.data}&lang=${lang}`;
        break;
      case 'array':
        opts.data.push({
          name: 'lang',
          value: lang
        });
        break;
    }
  } else {
    opts.data = `lang=${lang}`;
  }

  return $.ajax(Object.assign({}, defaultOpts, opts));
}

export const loadScript = (url, callback) => {
  if (!scriptLoader[url]) {
    scriptLoader[url] = {
      loaded: false,
      callbacks: [ callback ]
    };

    getScript(url, () => {
      scriptLoader[url].loaded = true;
      scriptLoader[url].callbacks.forEach(callback => {
        typeof callback === 'function' && callback();
      });
    });
  } else if (scriptLoader[url].loaded) {
    typeof callback === 'function' && callback();
  } else {
    scriptLoader[url].callbacks.push(callback);
  }
}

export const downloadFile = (url, fileName) => {
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

  window.setTimeout(() => $link.remove());
};
