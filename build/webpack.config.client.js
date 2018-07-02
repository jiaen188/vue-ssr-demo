const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin()
]

// devServer 在webpack2.0后才有的
const devServer = {
    port: 8000,
    // host: '127.0.0.1', // 好处： 可以在别人电脑上通过ip访问，或者手机
    host: '0.0.0.0', // 好处： 可以在别人电脑上通过ip访问，或者手机
    overlay: { // 编译的时候出现错误，就显示到网页上
        errors: true
    },
    hot: true, // 热更新，只更新修改的页面，不会刷新整个页面
    // open: true // 自动打开网页
}

let config

if (isDev) {
    config = merge(baseConfig, {
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
        plugins: defaultPlugins.concat([ // 热更新的相关插件
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
} else {
    config = merge(baseConfig, {
        entry: { // 第三方的类库，一般比较稳定，不会和业务代码一样经常变动，所以要单独打包
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue']
        },
        // 如果是hash，那么每次打包，各个带有hash的文件，他们的hash都是相同的，
        // 这样，每次生成环境打包后，vendor也是每次都变化了，每次都会重新加载，就没有单独打包的意义了
        // 使用chunkhash的话，每个单独文件的hash都不同
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {  // 生产环境的css需要外联
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'), // css相关插件
            new webpack.optimize.CommonsChunkPlugin({ // 第三方类库打包，单独打包到vendor.js中
                name: 'vendor'
            }),
            // FIXME: 这边还是不大明白，再看看https://www.imooc.com/video/16410
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    })
}

module.exports = config
