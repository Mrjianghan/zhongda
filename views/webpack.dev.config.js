const webpack = require('webpack');
const config = require('./webpack.config');

config.output.publicPath = '/';

config.devServer = {
    historyApiFallback: {
        rewrites: [
            { from: /^\/system/, to: '/system/index.html'},
            { from: /^\/login/, to: '/login/index.html'},
            { from: /^\/mall/, to: '/mall/index.html'},
            { from: /^\/manageSystem/, to: '/manageSystem/index.html'}
        ]
    },
    hot: false,
    inline: true,
    compress: true,
    port: 8000,
    proxy: {
        '/api/*': {
            target: 'http://localhost:18801',
            //target:'http://test.zhongdapuhui.com',
            changeOrigin: true
        },
        '/v1/file': {
            target: 'http://192.168.100.49:16130',
            changeOrigin: true
        }
    }
};

config.plugins = (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin() // 开发环境使用
]);

module.exports = config;