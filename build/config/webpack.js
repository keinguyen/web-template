const {
  join
} = require('path')

const {
  dist,
  srcScript,
  distScript
} = require('./directories')

const browsers = require('./autoprefixer')

module.exports = {
  context: join(__dirname, dist),
  output: {
    path: join(__dirname, distScript),
    filename: 'apps.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers
              }
            }], 'stage-2'
          ],
          plugins: ['transform-runtime'],
          cacheDirectory: true
        }
      }
    ]
  },
  resolve: {},
  devtool: 'source-map'
}
