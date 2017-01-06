'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PROJECT_ROOT = path.resolve(__dirname)
const PACKAGE_VERSION = String(require('./package.json').version)

module.exports = function(){
  var config = {
    name: `client`,
    devtool: 'source-map',
    entry: {
      client: [
        path.join(PROJECT_ROOT, 'docs/src/client/client.js'),
      ],
    },
    output:{
      path: path.join(PROJECT_ROOT, 'docs'),
      filename: process.env.NODE_ENV === 'production' ? '[hash].[name].js' : 'client.js',
      publicPath: ''
    },
    plugins: [],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [/node_modules/, './lib', './docs/server', './test', './src'],
          query:{
            plugins: [],
            presets: ["es2015", 'stage-0', 'react']
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

  if(process.env.NODE_ENV === 'development'){
    config.entry.client.unshift('webpack-hot-middleware/client?reload=true')
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    )
  }

  if(process.env.NODE_ENV === 'production') {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.PKG_VERSION': JSON.stringify(PACKAGE_VERSION)
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/,/moment$/),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor1', 'vendor2', 'vendor3', 'vendor4', 'vendor5', 'vendor6', 'manifest'],
      }),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        sourceMap: false,
        mangle: true
      }),
      new HtmlWebpackPlugin({
        title: 'Reactables',
        template: path.join(PROJECT_ROOT, 'docs/src/index.template.html'),
        inject: 'body',
        filename: path.join(PROJECT_ROOT, 'docs/index.html'),
        minify: { collapseWhitespace: true, minifyCSS: true, minifyJS: true }
      })
    )
    config.entry = {
      client: config.entry.client,
      vendor1: [
        'react',
        'react-dom',
      ],
      vendor2: [
        'redux',
        'react-redux',
      ],
      vendor3:[
        'react-router',
        'isomorphic-fetch'
      ],
      vendor4:[
        'd3',
        'd3-sankey',
      ],
      vendor5: [
        'moment',
      ],
      vendor6: [
        'lodash'
      ]
    }
  }

  return config
}
