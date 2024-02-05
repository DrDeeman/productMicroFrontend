const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = { 
  entry: {
    app: path.join(__dirname, 'src/app.js')
  },
  output: {
    filename: 'scripts/[name].js',
    assetModuleFilename: 'assets/images/[name][ext]',
    path: path.join(__dirname, '/dist'),
    asyncChunks: true
  },
  optimization: {
    splitChunks: false,
    runtimeChunk: false
  },
  experiments:{
    topLevelAwait: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'project',
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
        type:'asset'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
};
