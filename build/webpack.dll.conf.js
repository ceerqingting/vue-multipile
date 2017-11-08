const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    libs: ['vue/dist/vue.common', 'vue-router', 'vuex', 'axios', 'fastclick', 'jsonp', 'babel-polyfill', 'vuex-router-sync']
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: path.resolve(__dirname, '..'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
};