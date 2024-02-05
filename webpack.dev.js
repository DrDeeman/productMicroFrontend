const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
require('dotenv').config();
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = merge(config, {
  mode: 'development',
  output:{
    publicPath:'http://localhost:3002/'
  },
  devServer: {
    //static:path.join(__dirname,"dist"),
    port: 3002,
    historyApiFallback: true,
    
    proxy: {
      '/products_api/*': {
        target: 'http://[::1]:8061/',
       // pathRewrite: { '^/products_api': '' },
        changeOrigin: true,
      },
      '/users_api/*': {
        target: 'http://[::1]:8091/',
      //  pathRewrite: { '^/users_api': '' },
        changeOrigin: true,
      },
    },
    
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'product_users',
      filename: 'remoteProduct.js',
      exposes: {
        './ProductUsers': './src/App/test_component.js',
      },
      remotes: {
       //'host': 'users@http://localhost:3001/remoteUsers.js'
      'host': remoteConfig('users','"http://localhost:3001/remoteUsers.js"')
      },
      shared:{
        'react':{singleton: true, strictVersion: false, eager: true, requiredVersion:'^18.0.0'},
        'react-dom':{singleton: true, strictVersion: false, eager: true,requiredVersion:'^18.0.0'},
      }
    })
  ],
});


function remoteConfig(name,url){
  return `promise new Promise(resolve => {
        
    const remoteUrlWithVersion = ${url};
    const script = document.createElement('script');
    script.src = remoteUrlWithVersion;

    script.onload = () => {
      
      const proxy = {
        get: (request) => {
         
          return window.${name}.get(request);
        },
        init: (arg) => {
          try {
            
            return window.${name}.init(arg)
          } catch(ev) {
            console.log('remote container already initialized')
          }
        }
      }
      resolve(proxy)
    }
    script.onerror = (error) => {
      console.error('error loading remote container')
      const proxy = {
        get: (request) => {
          // If the service is down it will render this content
          return Promise.resolve(() => () => false);
        },
        init: (arg) => {
          return;
        }
      }
      resolve(proxy)
    }
    // inject this script with the src set to the versioned remoteEntry.js
    document.head.appendChild(script);
  })
  `
}