'use strict';
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.config')
module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
    },
  })