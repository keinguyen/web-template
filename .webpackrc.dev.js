const { tmpJs } = require('./.dirrc')

module.exports = {
  mode: 'development',
  output: {
    path: tmpJs,
    filename: '[name].js'
  }
  // context: join(__dirname, '../../', output),
  // output: {
  //   path: join(__dirname, '../../', outputScript),
  //   filename: '[name].js'
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       loader: 'babel-loader',
  //       options: {
  //         cacheDirectory: true
  //       }
  //     }
  //   ]
  // },
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
  // optimization: {
  //   splitChunks: false
  // }
}
