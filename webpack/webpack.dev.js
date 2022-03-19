const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackCommon = require('./webpack.common');

const cfg = webpackCommon({
  mode: 'development',
});

cfg.devtool = 'inline-source-map';
// cfg.entry.webapp.splice(0, 0, 'webpack-hot-client/client?reload=true');
// cfg.plugins.splice(1, 0,
//   new BundleAnalyzerPlugin({
//     analyzerMode: 'server',
//     analyzerHost: 'localhost',
//     analyzerPort: 8889,
//     reportFilename: 'report.html',
//     defaultSizes: 'parsed',
//     openAnalyzer: false,
//     generateStatsFile: false,
//     statsFilename: 'stats.json',
//     statsOptions: null,
//     logLevel: 'info',
//   })
// );

module.exports = cfg;
