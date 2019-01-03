const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const entry = [
  './src/client/index.js',
  './public/styles.css'
];

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  },
  entry,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/')
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/, 
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ],
  },
  plugins : [
    new HtmlWebpackPlugin({
      template : './public/index.html'
    })
  ],
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};    
          