var path = require("path");
var webpack = require('webpack');
var SRC_DIR = path.join(__dirname, 'client/src');
var DIST_DIR = path.join(__dirname, 'client/dist');

 module.exports = {
     entry: `${SRC_DIR}/index.jsx`,
     output: {
         path: DIST_DIR,
         filename: 'bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.jsx?/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015', 'react']
                 }
             }
         ],
     },
     devtool: 'source-map'
 };