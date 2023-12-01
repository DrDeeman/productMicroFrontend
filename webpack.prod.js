const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(config, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.I18N_DEBUG': JSON.stringify(false),
      'process.env.WS_URL': JSON.stringify('wss://sputnic.tech:8070/ws'),
    }),
  ],
});
