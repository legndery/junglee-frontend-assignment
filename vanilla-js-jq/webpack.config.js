const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const config = {
    entry: './src/index.js',
    output: {
        filename: './build/build.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // files ending with .js
                exclude: /node_modules/, // exclude the node_modules directory
                loader: "babel-loader" // use this (babel-core) loader
            },
            {
                test: /\.scss$/, // files ending with .scss
                use: ['style-loader','css-loader', 'sass-loader'], // use these loaders
            },
            {
                test: /\.css$/, // files ending with .scss
                use: ['style-loader','css-loader'], // use these loaders
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }

        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('styles.css') // call the ExtractTextWebpackPlugin constructor and name our css file
    ],
}
module.exports = config;