'use strict'

const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const utils = require('./utils')

module.exports = {
  mode: 'development',

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'assets': utils.resolve('assets'),
      'api': utils.resolve('src/api'),
      'pages': utils.resolve('src/pages'),
      'components': utils.resolve('src/components')
    }
  },

  entry: [
    './src/app.js'
  ],

  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    }
  },

/*  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  }, */

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
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
