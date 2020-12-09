const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/dist/',
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: '.eslintrc.js',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new StyleLintPlugin({
      configFile: '../../config/.stylelintrc',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    writeToDisk: true,
    overlay: true,
    open: false,
    allowedHosts: [
      'tomoveit.test',
    ],
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
