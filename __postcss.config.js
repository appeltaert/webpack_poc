// Cant use this, the vue-loader doesnt pass the same context and its not enforced by postcss-load-config
module.exports = ({ file, options, env }) => ({
    // we mainly use less/scss, but still allow css parsing with sugarss on .css files
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
        'postcss-import': { root: file.dirname },
        'postcss-cssnext': options.cssnext ? options.cssnext : false,
        'cssnano': env === 'production' ? options.cssnano : false
    }
});
