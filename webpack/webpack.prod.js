const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const webpackCommon = require('./webpack.common');

const cfg = webpackCommon({
  mode: 'production',
});

cfg.devtool = 'cheap-source-map';
cfg.output.publicPath = './';
cfg.plugins.splice(1, 0,
  new webpack.optimize.AggressiveMergingPlugin(),
  new CompressionPlugin({
    test: /\.js/,
  })
);

// // for debug
// cfg.optimization = {
//   minimize: false,
// };

module.exports = cfg;
