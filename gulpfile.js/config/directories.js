const { addPath } = require('../utils');

const isProduction = process.env.NODE_ENV === 'production';
const ignoreTemplate = ['$*/**/*', '_*/**/*'];

const nodeModules = 'node_modules/';
exports.nodeModules = nodeModules;

const src = 'src/';
exports.src = src;

const dest = 'static/';
const dist = 'dist/';
const output = isProduction ? dist : dest;
exports.output = output;

const srcLocales = `${src}locales/`;
exports.srcLocales = srcLocales;

const srcAsset = `${src}assets/`;
exports.srcAsset = srcAsset;

const filesCopy = addPath(srcAsset, '**', 'favicon/**');
const filesFavicon = addPath(srcAsset, 'favicon/**');
const filesAssets = filesCopy
  .concat(filesFavicon)
  .concat(isProduction ? 'index.html' : []);
exports.filesAssets = filesAssets;

const srcScript = `${src}scripts/`;
exports.srcScript = srcScript;

const filesJs = addPath(srcScript, '**/*.js', ignoreTemplate);
exports.filesJs = filesJs;

const filesJsES6 = `${srcScript}*.js`;
exports.filesJsES6 = filesJsES6;

const outputScript = `${output}js/`;
exports.outputScript = outputScript;

const outputChunkScripts = `${outputScript}chunks/`;
exports.outputChunkScripts = outputChunkScripts;

const filesChunkJs = addPath(outputChunkScripts, '*.js', '*.backup.js');
exports.filesChunkJs = filesChunkJs;

const srcStyle = `${src}styles/`;
exports.srcStyle = srcStyle;

const filesScssBuilt = addPath(
  srcStyle,
  '**/*.scss',
  ['$*/**/*.scss', '_*/**/*.scss']
);
exports.filesScssBuilt = filesScssBuilt;

const filesScssPartial = addPath(
  srcStyle,
  ['$*/**/*.scss', '_*/**/*.scss']
);
exports.filesScssPartial = filesScssPartial;

const outputStyle = `${output}css/`;
exports.outputStyle = outputStyle;

const filesCssBuilt = addPath(outputStyle, '*.css', '*-rtl.css');
exports.filesCssBuilt = filesCssBuilt;

const srcView = `${src}views/`;
exports.srcView = srcView;

const filesPugBuilt = addPath(srcView, '**/*.pug', ['$*/**/*', '_*/**/*']);
exports.filesPugBuilt = filesPugBuilt;

const filesPug = addPath(srcView, '**/*.pug');
exports.filesPug = filesPug;
