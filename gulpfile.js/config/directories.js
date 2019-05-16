const { addPath } = require('../utils');

const isProduction = process.env.NODE_ENV === 'production';

const nodeModules = 'node_modules/';
exports.nodeModules = nodeModules;

const src = 'src/';
exports.src = src;

const static = 'static/';
exports.static = static;

const dist = 'dist/';
exports.dist = dist;

const output = isProduction ? dist : static;
exports.output = output;

const srcLocales = `${src}locales/`;
exports.srcLocales = srcLocales;

const srcAsset = `${src}assets/`;
const filesFavicon = addPath(srcAsset, 'favicon/**/*' , 'favicon/**/.gitkeep');
const filesCopy = addPath(srcAsset, '**/' , ['**/.gitkeep', 'favicon/']);
const filesAssets = filesCopy
  .concat(filesFavicon)
  .concat(isProduction ? 'index.html' : []);
exports.filesAssets = filesAssets;


// const srcStyle = `${src}styles/`;
// const srcStyleCore = `${srcStyle}_cores/`;
// const srcScript = `${src}scripts/`;
// const srcView = `${src}views/`;


// const distStyle = `${dist}css/`;
// const distScript = `${dist}js/`;
// const distImage = `${dist}images/`;
// const distData = `${dist}data/`;
// const distFont = `${dist}fonts/`;
// const distFontAwesome = `${distFont}FontAwesome/`;

// const filesPug = addPath(srcView, '**/*.pug', ['$*/**/*', '_*/**/*']);
// const filesPugAll = addPath(srcView, '**/*.pug');
// const filesLocales = `${srcLocales}**/*.json`;

// const filesScssApps = `${srcStyle}apps.scss`;
// const filesScssLibs = `${srcStyle}libs.scss`;
// const filesScssOthers = addPath(srcStyle, '**/*.scss', [
//   'apps.scss',
//   'libs.scss',
//   '$*/**/*',
//   '_*/**/*'
// ]);
// const filesScssAppsWatch = addPath(srcStyle, ['apps.scss', '$*/**/*.scss']);
// const filesScssLibsWatch = addPath(srcStyle, ['libs.scss', '_*/**/*.scss']);

// const filesJs = addPath(srcScript, '**/*.js', ['$*/**/*', '_*/**/*']);
// const fileJsLib = addPath(srcScript, '_lib/**/*.js');




// const filesFontAwesome = `${nodeModules}font-awesome/fonts/*`;

// const allDistFiles = `${dist}**/*`;