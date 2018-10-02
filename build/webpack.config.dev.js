'use strict'

const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: [
    './src/app.js'
  ],

  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    }
  },

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
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin({
      template: 'index.html'
    })
  ]
}