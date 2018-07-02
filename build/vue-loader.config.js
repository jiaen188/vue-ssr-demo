module.exports = (isDev) => { // 根据不同的环境生成不同的配置
  return {
    preserveWhitepace: true, // template模板中结尾空格，为了去除这个空格
    extractCSS: !isDev, // 为了把vue文件中的css，通过extract-text-webpack-plugin打包成一个css文件,和其他css一起的文件中。
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', // 样式名转化成和url-loader配置的效果类似
      camelCase: true // css中用item-header这种类名，转化成itemHeader的驼峰命名
    }
    // hotReload: false // 热重载，默认根据环境变量生成
  }
}
