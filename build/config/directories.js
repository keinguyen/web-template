// Path Functions
const pushPath = (src, paths, notInclude) => {
  let notChar = notInclude ? '!' : '';

  return []
    .concat(paths || [])
    .map(item => notChar + src + item);
}

const addPath = (src, paths, notIncludePaths) => {
  if (typeof src === 'undefined') {
    return '**/*';
  }

  if (typeof paths === 'undefined') {
    return `${src}**/*`;
  }

  let includePaths = pushPath(src, paths, false);
  let notICPath = pushPath(src, notIncludePaths, true);

  return includePaths.concat(notICPath);
}
// End Path Functions


const nodeModules = 'node_modules/';
const src = 'app/';
const dist = 'dist/';

const srcAsset = `${src}assets/`;
const srcStyle = `${src}styles/`;
const srcStyleCore = `${srcStyle}_cores/`;
const srcScript = `${src}scripts/`;
const srcView = `${src}views/`;
const srcLocales = `${src}locales/`;

const distStyle = `${dist}css/`;
const distScript = `${dist}js/`;
const distImage = `${dist}images/`;
const distData = `${dist}data/`;
const distFont = `${dist}fonts/`;
const distFontAwesome = `${distFont}FontAwesome/`;

const filesPug = addPath(srcView, '**/*.pug', ['$*/**/*', '_*/**/*']);
const filesPugAll = addPath(srcView, '**/*.pug');
const filesLocales = `${srcLocales}**/*.json`;

const filesScssApps = `${srcStyle}apps.scss`;
const filesScssLibs = `${srcStyle}libs.scss`;
const filesScssOthers = addPath(srcStyle, '**/*.scss', [
  'apps.scss',
  'libs.scss',
  '$*/**/*',
  '_*/**/*'
]);
const filesScssAppsWatch = addPath(srcStyle, ['apps.scss', '$*/**/*.scss']);
const filesScssLibsWatch = addPath(srcStyle, ['libs.scss', '_*/**/*.scss']);

const filesJs = addPath(srcScript, '**/*.js', ['$*/**/*', '_*/**/*']);
const fileJsLib = addPath(srcScript, '_lib/**/*.js');

const filesCopy = addPath(srcAsset, '**/*' , ['**/.gitkeep', 'site/*']);
const filesSite = addPath(srcAsset, 'site/**/*' , '**/.gitkeep');
const filesAssets = filesCopy.concat(filesSite);
const filesFontAwesome = `${nodeModules}font-awesome/fonts/*`;

const allDistFiles = `${dist}**/*`;

module.exports = {
  nodeModules,

  src,
  srcAsset,
  srcStyle,
  srcStyleCore,
  srcScript,
  srcView,
  srcLocales,

  dist,
  distStyle,
  distScript,
  distImage,
  distData,
  distFont,
  distFontAwesome,

  filesPug,
  filesPugAll,
  filesLocales,

  filesScssApps,
  filesScssLibs,
  filesScssOthers,
  filesScssAppsWatch,
  filesScssLibsWatch,

  filesJs,
  fileJsLib,

  filesCopy,
  filesSite,
  filesAssets,
  filesFontAwesome,

  allDistFiles
}
