const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = merge(config, {
  mode: 'production',
  output:{
    publicPath:'http://127.0.0.1:8050/products_api/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.I18N_DEBUG': JSON.stringify(false),
    }),
    new ModuleFederationPlugin({
      name: 'product_users',
      filename: 'remoteProduct.js',
      exposes: {
        './ProductUsers': './src/App/test_component.js',
      },
      remotes: {
       'host': 'users@http://127.0.0.1:8050/users_api/remoteUsers.js'
      },
      shared:{
        'react':{singleton: true, strictVersion: false, eager: true, requiredVersion:'^18.0.0'},
        'react-dom':{singleton: true, strictVersion: false, eager: true,requiredVersion:'^18.0.0'},
      }
    })
  ],
});