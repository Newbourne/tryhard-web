var path         = require('path');
var webpack      = require('webpack');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var cssImport    = require('postcss-import');
var cssFonts     = require('postcss-font-magician');

var rootDir = path.join(__dirname, './../');

module.exports = {
    context: rootDir,
    entry: {
        app: [
        'webpack-dev-server/client?http://0.0.0.0:3010',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './index'
        ]
    },
    output: {
        path: path.join(rootDir, './dist'),
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:3010/'
    },
    devtool: "source-map",
    minimize: true,
    module: {
        loaders: [
          {
              test: /.jsx?$/,
              loaders: ['babel']
          },
          { 
              test: /\.css$/, 
              loader: "style!css!postcss"
          }
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {    
      extensions: ['', '.js', '.jsx']
    },
    postcss: function () {
        return [ 
          cssImport({
            addDependencyTo: webpack
          }),        
          precss,
          cssFonts,
          autoprefixer
      ];
    },
    externals: {
      "React": "react",
      "ReactDom": "react-dom"
    },
    devServer: {
        contentBase: "./",
        compress: true,
        color: true,
        hot: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        port: '3010',
        headers: { "Access-Control-Allow-Origin": "*" },
        stats: { colors: true }
    }
};