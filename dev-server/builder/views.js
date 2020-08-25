
const { join, dirname } = require('path')
const { mkdirSync, writeFileSync } = require('fs')

const { srcViews, dist } = require('../../.dirrc')
const {
  logGulp,
  walkSync,
  compileHtml,
  getAvaiableLocalesData
} = require('../helpers')

module.exports = () => {
  logGulp('Building HTML...')

  const allPugPaths = walkSync(srcViews, 'pug')

  const { DS_LOCALES } = process.env

  if (DS_LOCALES) {
    const locales = DS_LOCALES.split(',')
    const translator = getAvaiableLocalesData()

    allPugPaths.forEach((pugPath) => {
      const compiler = compileHtml(pugPath)
      const relativePath = pugPath
        .replace(srcViews, '')
        .replace(/^\\/, '')
        .replace(/\.pug$/, '')

      locales.forEach(($localeName) => {
        const variables = {
          $localeName,
          $translator: translator[$localeName]
        }

        const html = compiler(variables)
        const htmlPath = join(dist, $localeName, `${relativePath}.html`)
        const directoryPath = dirname(htmlPath)

        logGulp(`Generating ${htmlPath}...`)
        mkdirSync(directoryPath, { recursive: true })
        writeFileSync(htmlPath, html)
        logGulp('Finished')
      })
    })
  }

  logGulp('Finished building HTML')
}
