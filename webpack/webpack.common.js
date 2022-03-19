const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;

const baseFolderName = 'tp-assets';

const jsEntries = {};
fs.readdirSync('web/pages').forEach(file => {
  if (fs.lstatSync(`web/pages/${file}`).isDirectory()) {
    try {
      fs.lstatSync(`web/pages/${file}/app.ts`).isFile();
      jsEntries[`pages/${file}`] = [
        '@babel/polyfill',
        path.resolve(`web/pages/${file}/app.ts`),
      ];
    } catch (error) {
      return;
    }
  }
});

module.exports = ({ mode }) => ({
  mode,
  devtool: 'inline-source-map',
  entry: {
    webapp: [
      '@babel/polyfill',
      path.resolve('web/app.ts'),
    ],
    ...jsEntries,
  },
  output: {
    // path: path.resolve(frontEndJsPublicFolder),
    path: path.resolve(__dirname, '../', 'dist'),
    pathinfo: mode === 'development',
    filename: baseFolderName + '/js/[name].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'vue': mode === 'development'
        ? path.resolve('node_modules', 'vue/dist/vue.js')
        : path.resolve('node_modules', 'vue/dist/vue.min.js'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(__dirname, '../', 'web')
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['defaults', 'not dead'],
                },
              }],
              '@babel/typescript',
            ],
            plugins: [
              ['@babel/proposal-decorators', { decoratorsBeforeExport: true }],
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
            ],
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader, // 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentWidth: 2,
                includePaths: ['web/scss'],
              },
              additionalData: (content, loaderContext) => {
                // // More information about available properties https://webpack.js.org/api/loaders/
                // const { resourcePath, rootContext } = loaderContext;
                // const relativePath = path.relative(rootContext, resourcePath);

                // if (relativePath === 'styles/foo.scss') {
                //   return '$value: 100px;' + content;
                // }

                // return '$value: 200px;' + content;
                return content;
              },
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(jpg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: baseFolderName + '/images/[name].[ext]',
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            // name: baseFolderName + '/fonts/[name].[ext]',
            name: baseFolderName + '/fonts/[hash].[ext]',
          },
        }],
      },
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
    port: 8090,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(mode),
        'EXTERNAL_URL': JSON.stringify('https://test/test'),
      },
    }),
    new VueLoaderPlugin({
      productionMode: mode === 'production',
    }),
    new MiniCssExtractPlugin({
      filename: baseFolderName + '/css/[name].css',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve('static'),
    //       to: path.resolve('dist/static'),
    //     },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      chunks: ['webapp'],
      template: path.resolve('web', 'index.html'),
      // filename: 'webapp/index.html',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
  ],
});
