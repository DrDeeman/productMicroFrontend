const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = merge(config, {
  mode: 'production',
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
       'host': 'users@http://localhost:3001/remoteUsers.js'
      }
    })
  ],
});
