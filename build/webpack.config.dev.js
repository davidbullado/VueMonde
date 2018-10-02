'use strict'

const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: [
    './src/app.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin({
      template: 'index.html'
    })
  ]
}