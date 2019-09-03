const { readdirSync, lstatSync } = require('fs');

const pushPath = (src, paths, wontInclude) => {
  const not = wontInclude ? '!' : '';

  return [].concat(paths || []).map(item => not + src + item);
};

exports.addPath = (src, paths, notIncludePaths) => {
  if (typeof src === 'undefined') {
    return '**/*';
  }

  if (typeof paths === 'undefined') {
    return `${src}**/*`;
  }

  const includePaths = pushPath(src, paths, false);
  const notICPath = pushPath(src, notIncludePaths, true);

  return includePaths.concat(notICPath);
};

exports.getFolders = (dir) => {
  try {
    return readdirSync(dir)
      .filter(folder => lstatSync(dir + folder).isDirectory());
  } catch (err) {
    return [];
  }
};

exports.pluralText = (text, number) => text + (number > 1 ? 's' : '');

exports.renderErrorHTML = (msg) => `
  <body>
    <style>
      html {
        background-color: #000;
        color: #fff;
        font-family: monospace;
      }
    </style>
    <pre>${msg}</pre>
  </body>
`;
