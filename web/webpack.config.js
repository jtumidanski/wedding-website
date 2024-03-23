// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
