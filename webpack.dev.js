const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
require('dotenv').config();
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = merge(config, {
  mode: 'development',
  devServer: {
    //static:path.join(__dirname,"dist"),
    port: 3002,
    historyApiFallback: true,
    proxy: {
      '/app/*': {
        target: 'http://[::1]:8090/app',
        pathRewrite: { '^/app': '' },
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
          } catch(e) {
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