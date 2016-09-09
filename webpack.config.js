'use strict'

const path = require('path')
const webpack = require('webpack')

const PROJECT_ROOT = path.resolve(__dirname)

console.log(PROJECT_ROOT)

module.exports = function(){
  return {
    name: `client`,
    devtool: 'cheap-module-eval-source-map',
    entry: {
      client: [
        'webpack-hot-middleware/client?reload=true',
        path.join(PROJECT_ROOT, 'demo/client.js'),
      ]
    },
    output:{
      path: path.join(PROJECT_ROOT, 'demo/public'),
      filename: 'client.js',
      publicPath: ''
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: [/node_modules/, './lib', './demo/server', './test'],
          query:{
            plugins: [],
            presets: ['es2015', 'stage-0', 'react']
          }
        }
      ]
    }
  }
}
