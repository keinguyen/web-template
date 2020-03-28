const { join } = require('path')

const src = join(__dirname, 'src')

const srcLocales = join(src, 'locales')
exports.srcLocales = srcLocales

const filesLocale = join(srcLocales, '**/*.json')
exports.filesLocale = filesLocale

const srcViews = join(src, 'views')
exports.srcViews = srcViews

const filesView = join(srcViews, '**/*.pug')
exports.filesView = filesView

const srcStyles = join(src, 'styles')
exports.srcStyles = srcStyles

const filesStyle = join(srcStyles, '**/*.scss')
exports.filesStyle = filesStyle

const srcScripts = join(src, 'scripts')
exports.srcScripts = srcScripts

const filesScript = join(srcScripts, '**/*.js')
exports.filesScript = filesScript

const public = join(__dirname, 'public')
exports.public = public

const filesPublic = join(public, '**/*')
exports.filesPublic = filesPublic

const tmp = join(__dirname, '.tmp')
exports.tmp = tmp

const tmpJs = join(tmp, 'js')
exports.tmpJs = tmpJs
