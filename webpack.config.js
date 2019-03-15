/*
 * @Author: Yzed 
 * @Date: 2019-02-17 14:38:40 
 * @Last Modified by: Yzed
 * @Last Modified time: 2019-03-17 09:21:29
 */

const path = require('path')
const ExtractTextPlugin   = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

//环境变量配置
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
// console.log(WEBPACK_ENV)
//获取html-webpack-plugin参数的方法
let getHtmlConfig = function(name,title){
    return {
        template: `./src/view/${name}.html`,
        filename: `view/${name}.html`,
        title: title,
        inject: true,
        hash: true,
        chunks: ['common',name]
    }
}

//webpack配置
const config = {
    mode : 'dev' === WEBPACK_ENV ? 'development' : 'production',
    entry: {
        'common'            : './src/page/common/common',
        'index'             : './src/page/index/index',
        'list'             : './src/page/list/list',
        'detail'             : './src/page/detail/detail',
        'cart'             : './src/page/cart/cart',
        'user-login'        : './src/page/user-login/user-login',
        'user-register'     : './src/page/user-register/user-register',
        'user-pass-reset'   : './src/page/user-pass-reset/user-pass-reset',
        'user-center'       : './src/page/user-center/user-center',
        'user-center-update': './src/page/user-center-update/user-center-update',
        'user-pass-update'  : './src/page/user-pass-update/user-pass-update',
        'result'            : './src/page/result/result'
    },
    output: {
        publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js'
    },
    devtool: 'source-map',
    devServer: {
        port: 8088,
        overlay: true,
        inline: true,
        //解决跨域问题
        proxy : {
            '**/*.do' : {
                target: 'http://test.happymmall.com',
                changeOrigin : true
            }
        }
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    resolve: {
        alias: {
            node_modules    : __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 针对js结尾的文件设置LOADER
                use: {
                    loader: 'babel-loader'
                },
                include: [path.resolve(__dirname,'./src')],
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // 模板文件的处理
            {
                test: /\.string$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize : true,
                        removeAttributeQuotes : false
                    }
                }
            },
            // 图片的配置
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            /* 
                            *  图片小于2kb的按base64打包
                            */
                            limit: 2048,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            // 字体图标的配置
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",
                    chunks: "all",
                    minChunks: 2
                }
                /*
                有以下两个打包都不能inline以及hot 为啥呢
                */
                //首先: 打包node_modules中的文件
                // vendor: {
                //     name: "vendor",
                //     test: /[\\/]node_modules[\\/]/,
                //     chunks: "initial",
                //     priority: -10
                // },
                // styles: {
                //     name: "styles",
                //     test: /\.css$/,
                //     chunks: "all",
                //     minChunks: 1,
                //     enforce: true
                // }
            }
        }
    },
    plugins: [
        //清理dist
        new CleanWebpackPlugin(['dist']),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        //html模板的处理
        new HtmlWebpackPlugin(
            getHtmlConfig('index', '首页')
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('list', '商品列表页') 
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('detail', '商品详情页') 
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('cart', '购物车') 
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('user-login', '用户登录')
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('user-register', '用户注册')
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('user-pass-reset', '找回密码')
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('user-center', '个人中心')
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('user-center-update', '修改个人信息')
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('user-pass-update', '修改密码')
        ),
        new HtmlWebpackPlugin(
            getHtmlConfig('result', '操作结果')
        ),

    ]
}

module.exports = config