const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './src/index_exa1.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: false,
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test:/\.css$/,
        use: [ 'style-loader', {
          loader: 'css-loader',
          options: {url: false}
        }]
      },
      {
        test: /\.(handlebars|hbs)$/,
        use: [{
      loader: 'handlebars-loader',
      options: {
          helperDirs: path.resolve('./src/templates/helpers')
      }
        }]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  }
};