const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const replacements = {
  APPLICATION_NAME: "LightningFuturesExchange",
};

const templateReplacementLoader = function (nextLoader, prevLoader) {
  return StringReplacePlugin.replace(nextLoader, {
    replacements: [
      { pattern: /\${([A-Za-z0-9_]*)}/, replacement(m, p1) { return replacements[p1]; } },
    ],
  }, prevLoader);
};

const extractHtml = new ExtractTextPlugin('[name]');

module.exports =  {
  entry: {
    'index.html': path.resolve(__dirname, '../index.html'),
    'js/index.js': path.resolve(__dirname, '../app/app.tsx'),
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, '../../backend/views'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
        '@': path.resolve(__dirname, '../app')
    }
  },
  bail: true,
  stats: {
    errors: true,
    errorDetails: true,
    colors: true,
    modules: false,
    children: false
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          ...extractHtml.extract({
            use: [
              {
                loader: 'html-loader',
                options: {
                  interpolate: 'require',
                },
              },
              { loader: templateReplacementLoader() },
            ],
          }),
        ],
      },
      // Compile .ts/.tsx
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          // Setting transpileOnly to true hides all typescript errors
          transpileOnly: false,
        },
      }
    ],
  },
  plugins: [
    extractHtml
  ],
};