const { ProvidePlugin } = require('webpack')
const { resolve, join } = require('path')

const { srcScript, output, outputScript } = require('./directories')

const nodeEnv = process.env.NODE_ENV
const isDevelopment = nodeEnv !== 'production'

module.exports = {
  mode: 'none',
  context: join(__dirname, '../../', output),
  output: {
    path: join(__dirname, '../../', outputScript),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolve(srcScript, 'cores')
    }
  },
  plugins: [
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Plugin: ['@/plugin', 'default']
    })
  ],
  optimization: {
    nodeEnv,
    splitChunks: false,
    flagIncludedChunks: true,
    concatenateModules: true,
    occurrenceOrder: true,
    sideEffects: true
  },
  devtool: isDevelopment && 'source-map'
}
