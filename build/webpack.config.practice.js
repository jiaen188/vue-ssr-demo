const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, './template.html')
  })
]

// devServer 在webpack2.0后才有的
const devServer = {
  port: 8080,
  // host: '127.0.0.1', // 好处： 可以在别人电脑上通过ip访问，或者手机
  host: '0.0.0.0', // 好处： 可以在别人电脑上通过ip访问，或者手机
  overlay: { // 编译的时候出现错误，就显示到网页上
    errors: true
  },
  hot: true // 热更新，只更新修改的页面，不会刷新整个页面
  // open: true // 自动打开网页
}

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl/, // 开发环境的css代码可以内联
        use: [
          'vue-style-loader',
          'css-loader',
          /* { // 在import的css中使用css module，但是所有的 import css都要使用css module，所以我们这边不使用了
              loader: 'css-loader',
              options: {
                  module: true, // 开始css module
                  localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]' // 样式名转化成和url-loader配置的效果类似
              }
          }, */
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true // stylus-loader会生成sourceMap，postcss-loader也会，加上这个选项表示用生成的sourceMap，提示编译效率
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  // import Vue form 'vue'
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([ // 热更新的相关插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
