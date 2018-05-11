const path = require("path");
const webpack = require("webpack");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const isProd = process.env.NODE_ENV === 'prod';

const lessLoaderOptions = {
    strictMath: true,
    noIeCompat: true
};

const cssLoaderOptions = {
    importLoaders: 1
};

const postcssLoaderOptions = {
    config: {
        ctx: {
            cssnext: {},
            cssnano: {},
        }
    },
    plugins: [
        require('postcss-import')(),
        require('postcss-cssnext')({
            warnForDuplicates: false // Disable autoprefixer warning, thats also used by nano
        }),
    ].concat(!isProd ? [require('cssnano')()] : [])
};

module.exports = {
    entry: {
        vendor: ["jquery", "bootstrap", "react", "react-dom", "vue"],
        component1: "./src/component1/src.js",
        component2: "./src/component2/src.js",
        "react-component": "./src/react-component/src.jsx",
        "vue-spf": "./src/vue-spf/index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".css"],
        alias: {
            module: path.resolve(__dirname, "src/shared/"),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new CommonsChunkPlugin({
            // The order of this array matters
            names: ["common", "vendor"],
            minChunks: 2
        }),
        new CleanWebpackPlugin(["dist"]),
        new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "windows.jQuery": "jquery",
        })
    ],
    module: {
        rules: [
            { test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader', options: { name: '[name].[ext]?[hash]' }},
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["babel-loader"] },
            { test: /\.html$/, use: "html-loader" },
            { test: /\.css$/, use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    { loader: "css-loader", options: cssLoaderOptions },
                    { loader: "postcss-loader", options: postcssLoaderOptions }
                ]
            }) },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.sss$/, use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    { loader: "css-loader", options: cssLoaderOptions },
                    { loader: "postcss-loader", options: Object.assign({}, postcssLoaderOptions, { parser: 'sugarss', syntax: 'sugarss' }) }
                ]
            }) },
            { test: /\.less$/, use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    { loader: "css-loader", options: cssLoaderOptions },
                    { loader: "postcss-loader", options: postcssLoaderOptions },
                    { loader: "less-loader", options: lessLoaderOptions }
                ]
            }) },
            { test: /\.vue$/, loader: 'vue-loader' , options: {
                postcss: postcssLoaderOptions,
                extractCSS: true
            } },
        ]
    }
}

