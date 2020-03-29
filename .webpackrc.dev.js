module.exports = {
  mode: 'development',
  // context: join(__dirname, '../../', output),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }, {
            loader: 'eslint-loader',
            options: {
              configFile: './.eslintrc.js',
              cache: true,
              failOnError: true,
              formatter (res) {
                debugger

                return ''
              },
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: false
  },
  // resolve: {
  //   alias: {
  //     '@': resolve(srcScript, 'cores')
  //   }
  // },
  // plugins: [
  //   new ProvidePlugin({
  //     $: 'jquery',
  //     jQuery: 'jquery',
  //     Plugin: ['@/plugin', 'default']
  //   })
  // ],
  // devtool: 'inline-source-map' // Uncomment this line if you have problem with debug in devtool
  devtool: 'source-map' // Comment this line if above line is uncommented
}
