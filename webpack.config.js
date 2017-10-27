const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path              = require('path')

const srcDir = path.resolve(__dirname, 'src')
const outDir = path.resolve(__dirname, 'public')

module.exports = {
  entry: path.resolve(srcDir, 'index.tsx'),
  output: {
    filename: 'bundle.js',
    path: outDir
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'awesome-typescript-loader' },
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html')
    }),
  ]
}
