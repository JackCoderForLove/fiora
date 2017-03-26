const path = require('path');
const utils = require('./utils');
const config = require('../config');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
        pc: './src/client/webPc/index.js',
        mobile: './src/client/webMobile/index.js',
        next: './src/client/next/index.js',
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {

            react$: 'react/dist/react.js',
            '@': resolve('src'),
            assets: resolve('src/client/assets'),
            components: resolve('src/client/components'),
            next: resolve('src/client/next'),
        },
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: [resolve('src')],
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    /node_modules\/chat-room-plugin/,
                ],
                exclude: /node_modules(?!\/chat-room-plugin)/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(mp3|ogg|wav)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('sounds/[name].[hash:7].[ext]'),
                },
            },
        ],
    },
};
