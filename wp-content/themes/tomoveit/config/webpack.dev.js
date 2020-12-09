const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
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
});
