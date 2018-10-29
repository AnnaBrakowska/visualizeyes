const path = require('path');
const CleanWebPackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputDir = 'build';

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, outputDir),
    filename: 'webpack-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|ttf|svg|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000000 }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/app': 'http://localhost:8080'
    }
  },
  plugins: [
    new CleanWebPackPlugin([outputDir]),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
