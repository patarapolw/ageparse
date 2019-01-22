const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function getEntries() {
    return fs.readdirSync('./src/')
        .filter(
            (file) => file.match(/.*\.ts$/)
        )
        .map((file) => {
            return {
                name: file.substring(0, file.length - 3),
                path: './src/' + file
            }
        }).reduce((memo, file) => {
            memo[file.name] = file.path
            return memo;
        }, {})
}

module.exports = {
    entry: getEntries(),
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].min.js',
        // library: ['[name]']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                ],
                include: /\.module\.css$/
            }
        ]
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js'
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: "templates/*",
            to: "[name].[ext]"
        }])
    ]
};