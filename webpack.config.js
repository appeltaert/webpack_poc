const webpack = require('webpack');
const commonCfg = require('./webpack.config.common');

module.exports = Object.assign(commonCfg, {
    plugins: commonCfg.plugins.concat([
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: '"production"'
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     include: /\.js$/,
        //     minimize: true
        // })
    ])
});