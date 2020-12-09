const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [

    ],
  },
  plugins: [

  ],
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({}),
    ],
  },
});
