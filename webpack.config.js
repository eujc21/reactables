'use strict'

const path = require('path')
const webpack = require('webpack')

const PROJECT_ROOT = path.resolve(__dirname)

module.exports = function(){
  var config = {
    name: `client`,
    devtool: 'source-map',
    entry: {
      client: [
        'webpack-hot-middleware/client?reload=true',
        path.join(PROJECT_ROOT, 'docs/src/client/client.js'),
      ]
    },
    output:{
      path: path.join(PROJECT_ROOT, 'docs/public'),
      filename: 'client.js',
      publicPath: ''
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [/node_modules/, './lib', './docs/server', './test', './src'],
          query:{
            plugins: [],
            presets: ['es2015', 'stage-0', 'react']
          }
        },
        {
          test: /\.(ico)$/,
          loader: "static-loader"
        },
        {
          test: /\.css/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=100000&mimetype=application/font-woff'
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=100000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=100000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=100000&mimetype=image/svg+xml'
        },
      ]
    }
  }

  // if(process.env.NODE_ENV === 'production') {
  //   config.entry = path.join(PROJECT_ROOT, 'src/index.js')
  //   config.output = {
  //     path: path.join(PROJECT_ROOT, 'lib'),
  //     filename: 'index.js'
  //   }
  // }


  return config
}
