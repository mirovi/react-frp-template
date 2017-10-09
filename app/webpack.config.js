const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// List of ENVs = [ 'development', 'production' ]
const ENV = process.env.NODE_ENV || 'development'
const isProductionEnv = (ENV === 'production')

// List of SERVERs = [ 'development', 'test', 'production' ]
const SERVER = process.env.SERVER || 'development'
const isDevelopmentServer = (SERVER === 'development')
const isTestServer = (SERVER === 'test')
const isProductionServer = (SERVER === 'production')

// Site Paths
const localhostPath = 'http://localhost:8989/'
const devPath = 'http://dev.site.com/'
const testPath = 'http://test.site.com/'
const prodPath = 'http://www.site.com/'

// Current site path
const publicPath = isProductionEnv
    ? prodPath
    : isTestServer
        ? testPath
        : isDevelopmentServer
            ? devPath
            : localhostPath

// Env specific entryfiles
const entry = {
    development: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://0.0.0.0:8989',
            'webpack/hot/only-dev-server',
            './src/index.js'
    ],
    production: ['./src/index.js']
}

// Env specific devtools
const devtool = {
    development: 'cheap-module-eval-source-map',
    production: 'cheap-module-source-map'
}

const processEnv = {
    NODE_ENV: JSON.stringify(ENV),
    SERVER: JSON.stringify(SERVER)
}

// Env specific plugins
const plugins = {
    development: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({ filename: 'assets/styles/styles.css', disable: true }),
        new StyleLintPlugin({
            files: ['src/**/*.s?(a|c)ss'],
            quiet: true
        }),
        new webpack.DefinePlugin({
            'process.env': processEnv
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
            colors: true,
            progress: true,
            sassLoader: {
                includePaths: [path.join(__dirname, 'src', 'styles')]
            },
            eslint: {
                configFile: './.eslintrc',
                emitWarning: true
            },
            options: {
                context: __dirname
            }
        })
    ],
    production: [
        new ExtractTextPlugin({ filename: 'assets/styles/styles.css', disable: false }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: { warnings: false }
        }),
        new webpack.DefinePlugin({
            'process.env': processEnv
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            colors: true,
            progress: true,
            sassLoader: {
                includePaths: [path.join(__dirname, 'src', 'styles')]
            },
            eslint: {
                configFile: './.eslintrc',
                emitWarning: true
            },
            options: {
                context: __dirname
            }
        })
    ]
}

module.exports = {
    entry: {
        bundle: entry[ENV]
    },
    devtool: devtool[ENV],
    output: {
        path: path.join(__dirname, 'dist'),
        chunkFilename: 'assets/scripts/[name].bundle[hash].js',
        filename: 'assets/scripts/[name][hash].js',
        publicPath: publicPath
    },
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ],
        alias: {
            '@Login': path.resolve(__dirname, 'src/features/login'),
            '@FrontPage': path.resolve(__dirname, 'src/features/front-page'),
            '@Commons': path.resolve(__dirname, '../commons/src')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: false
                        }
                    }
                ],
                include: path.join(__dirname, 'src')
            }, {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: path.join(__dirname, 'src')
            }, {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: path.join(__dirname, 'dist'),
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                import: true,
                                modules: true,
                                sourceMap: true,
                                camelCase: true,
                                importLoaders: 2,
                                localIdentName: '[local]___[hash:base64:5]'
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: [path.join(__dirname, 'src', 'styles')]
                            }
                        }]
                }),
            },
            { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
            { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]' },
            { test: /\.ttf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]' },
            { test: /\.inline.svg/, loader: 'svg-inline-loader' },
            { test: /\.url.svg/, loader: 'svg-url-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '!!ejs-loader!src/index.ejs'
        }),
        new CopyWebpackPlugin([
            { from: path.join(__dirname, 'src', 'assets', 'images'), to: path.join(__dirname, 'dist', 'assets', 'images') }
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'bundle',
            children: true,
            minChunks: 3
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) =>
                module.context && module.context.indexOf('node_modules') !== -1
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        })
    ].concat(plugins[ENV]),
    devServer: {
        host: '0.0.0.0',
        port: '8989',
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        headers: { "Access-Control-Allow-Origin": "*" },
        proxy: {
            '/api/mock': {
                target: 'http://localhost:8990/',
                pathRewrite: { '^/api/mock' : '/api' },
                secure: false
            },
            '/public': {
                target: 'http://localhost:8989/',
                pathRewrite: { '^/public' : '/' },
                secure: false
            }
        },
        historyApiFallback: {
            index: '/'
        }
    }
}
