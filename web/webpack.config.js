// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  entry: './index.ts', // Entry point for your application
  output: {
    filename: 'bundle.js', // Output bundle name
    // path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Match TypeScript files
        exclude: /node_modules/,
        use: 'ts-loader', // Use ts-loader for transpilation
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Resolve TypeScript and JavaScript files
  },
};
