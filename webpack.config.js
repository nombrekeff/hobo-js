const path = require('path');
module.exports = {
    entry: "./src/hobo.ts",
    output: {
        filename: "hobo.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }]
    },
    devtool: 'inline-source-map',
    target: 'node'
}