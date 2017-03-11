var path = require('path')
var webpack = require('webpack')

var rootDir = path.join(__dirname, './../')

module.exports = function(){
    return {
        context: rootDir,
        entry: {
            cast: [
            './css/base.css',
            './src/cast/index'
            ]
        },
        output: {
            path: path.join(rootDir, './dist-cast'),
            filename: '[name].bundle.js'
        },
        devtool: 'source-map',
        //minimize: true,
        module: {
            loaders: [
            {
                test: /.jsx?$/,
                loaders: ['babel']
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss',
                include: [
                path.join(rootDir, 'css'),
                path.join(rootDir, 'src')
                ]
            }
            ]
        },
        plugins: [
        ],
        resolve: {
            extensions: ['.js', '.jsx']
        },
        externals: {
            'SystemJS': 'SystemJS'
        }  
    }
}