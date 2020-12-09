const path = require('path');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

module.exports = {
  entry: './entry.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: './.babelrc',
            },
          },
        ],
      },
      {
        test: /\.css/,
        include: /node_modules\/react-tippy\/dist/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 2,
            },
          },
        ],
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new SVGSpritemapPlugin('include/img/sprites/*.svg', {
      output: {
        filename: 'spritemap.svg',
        svgo: false,
      },
      sprite: {
        prefix: 'order-',
        gutter: false,
        generate: {
          title: false,
          symbol: true,
        },
      },
      styles: false,
    }),
  ],
};
