const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name].js',
    assetModuleFilename: 'assets/images/[name][ext]',
    path: path.join(__dirname, '/dist'), ///var/www/sapi/public/CoreSite
    asyncChunks: true,
    publicPath:'http://localhost:3002/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'trekerserver',
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: false,
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /.(m|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.(png|jpg|jpeg)/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
};
