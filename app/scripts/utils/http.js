import $ from 'jquery';

import {
  GMapApiUrl,
  getType
} from './variables';

import {
  lang
} from './layout';

const scriptLoader = {};
const defaultFetchOpts = {
  cache: false
};

const getScript = (src) => new Promise((resolve, reject) => {
  let script = document.createElement('script');

  script.async = true;
  script.src = src;

  script.addEventListener('load', function () {
    document.head.removeChild(script);
    resolve(script);
  });

  script.addEventListener('error', function (err) {
    reject(err);
  });

  document.head.appendChild(script);
});

export const fetchData = (opts = {}) => {
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

  return $.ajax(Object.assign({}, defaultFetchOpts, opts));
};

export const loadScript = (url) => {
  if (!scriptLoader[url]) {
    scriptLoader[url] = getScript(url);
  }

  return scriptLoader[url];
};

export const loadMapApi = () => loadScript(GMapApiUrl);

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

  setTimeout(() => $link.remove());
};
