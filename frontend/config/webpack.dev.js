const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

process.traceDeprecation = true;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../'),
    compress: true,
    overlay: {
      //warnings: true,
      errors: true,
    },
    port: 4999,
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        bypass(req, res, proxyOptions) {
          if (req.originalUrl === '/') {
            // Tell Webpack-dev-server to serve the generated asset
            // which is served under '/assets' publicPath.
            return '../index.html';
          }
          return false;
        }
      }
    }
  }
});