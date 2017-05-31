var path = require('path');

module.exports = {
  entry: './src/index.js',
  entry: {
    all: './src/index.js',
    dom: './src/bind.dom.js',
    jQuery: './src/bind.jQuery.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bind.[name].js',
    library: 'bindEvent',
    libraryTarget: 'umd',
  },
};
