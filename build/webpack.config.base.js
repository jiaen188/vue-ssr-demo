const path = require('path')
const currentVueloaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
    // publicPath: '/public/' // 这边配置public后，在client中也要配置
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // 先预处理，在处理vue-loader
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: currentVueloaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: '/\.js$/',
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader', // 是对file-loader的封装
            options: {
              limit: 1024, // 如果图片小于1024，就转化成base64位
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
  // externals: {
  // 'vue': 'Vue'
  // }
}

module.exports = config
