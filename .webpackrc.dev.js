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
              formatter: 'json'
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
  devtool: 'source-map'
}
