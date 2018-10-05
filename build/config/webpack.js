const yargs = require('yargs');
const { ProvidePlugin } = require('webpack');
const { resolve, join } = require('path');

const {
  srcScript,
  dist,
  distScript
} = require('./directories');

const {
  env
} = yargs.argv;

const isDeveloping = env === 'dev';

module.exports = {
  mode: 'none',
  context: join(__dirname, dist),
  output: {
    path: join(__dirname, distScript),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              modules: 'amd'
            }]
          ],
          plugins: [
            [
              '@babel/plugin-transform-runtime', {
                helpers: true,
                regenerator: true
              }
            ],
            [
              '@babel/plugin-proposal-decorators', {
                legacy: true
              }
            ],
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-function-name',
          ],
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
      Plugin: ['@/plugin', 'Plugin'],
      Wrapper: ['@/plugin', 'Wrapper']
    })
  ],
  optimization: {
    flagIncludedChunks: true,
    concatenateModules: true,
    occurrenceOrder: true,
    sideEffects: true
  },
  devtool: isDeveloping && 'source-map'
};
