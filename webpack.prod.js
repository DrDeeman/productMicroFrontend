const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('webpack');

module.exports = merge(config, {
  mode: 'production',
  output:{
    publicPath:'http://localhost:8061/products_api/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.I18N_DEBUG': JSON.stringify(false),
    }),
    new ModuleFederationPlugin({
      name: 'product_users',
      filename: 'remoteProduct.js',
     // library:{type:"var",name:"product_users"},
      //remoteType:'var',
      exposes: {
        './ProductUsers': './src/App/test_component.js',
      },
      remotes: {
       'host': 'user@http://localhost:8200/users_api/remoteUsers.js'
       //'host':'users'
      },
      shared:{
        'react':{singleton: true, strictVersion: false, eager: true, requiredVersion:'^18.0.0'},
        'react-dom':{singleton: true, strictVersion: false, eager: true,requiredVersion:'^18.0.0'},
      }
    })
  ],
});
