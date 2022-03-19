# Gugu Vue Starter

gugu web starter for vue2/vue3
## packages

### @babel

#### - core
    transpiler 轉譯器

#### - polyfill
    預先載入補丁，以利使用
#### preset-env
    轉換 ES6 > ES5 相容環境
#### preset-typescript
    轉換 ES6 > ES5 相容


### "webpack" in package.json

#### webpack
    主核心

#### webpack-cli
    command lin interface

#### webpack-dev-server
    webpack serve 使用
    快速的打包
    最小化轉譯出 webapp.js
        正常的轉譯：source code > transpile > minify
#### webpack-hot-client
    hot reload  需重整頁面
    auto reload 無需重整頁面

###
HtmlWebpackPlugin

# rollup.js
跟webpack一樣的工具