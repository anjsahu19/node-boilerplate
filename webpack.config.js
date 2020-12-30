
'use strict';
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/app.ts',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
      },
    target: 'node', // <-- Important
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ],
        alias: {
            "@controllers": path.resolve(__dirname, 'src/controllers/'),
            "@models": path.resolve(__dirname, 'src/models/'),
            "@services": path.resolve(__dirname, 'src/services/'),
            "@middlewares": path.resolve(__dirname, 'src/middlewares/'),
            "@config": path.resolve(__dirname, 'src/config'),
            "@utils": path.resolve(__dirname, 'src/utils'),
            "@providers": path.resolve(__dirname, 'src/providers'),
        }
    },
    plugins: [
        // new Dotenv()
    ],
    externals: [nodeExternals()] // <-- Important
};