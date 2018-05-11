const webpack = require('webpack');
const commonCfg = require('./webpack.config.common');

module.exports = Object.assign(commonCfg, {
    stats: {
        errorDetails: true,
        colors: true,
        modules: true,
        reasons: true
    },
    watch: true,
    devtool: 'sourcemap',
    plugins: commonCfg.plugins.concat([
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: '"development"'
        //     }
        // })
    ])
});
