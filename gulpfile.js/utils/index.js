const { readdirSync } = require('fs');

const pushPath = (src, paths, wontInclude) => {
  const not = wontInclude ? '!' : '';

  return [].concat(paths || []).map(item => not + src + item);
}

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
  return readdirSync(dir, { withFileTypes: true })
    .filter(folder => folder.isDirectory())
    .map(({ name }) => name);
};


exports.pluralText = (text, number) => text + (number > 1 ? 's' : '');
