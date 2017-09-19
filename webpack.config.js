'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = () => {
  const config = {
    entry:  './src/index.js',
    module: {
      rules: [
        {
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
          },
          test: /\.js$/,
        },
      ],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
    },
    watch: true,
  };

  return config;
}
