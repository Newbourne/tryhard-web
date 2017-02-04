var path         = require('path');
var webpack      = require('webpack');

var rootDir = path.join(__dirname, './../');

module.exports = {
    context: rootDir,
    entry: {
        client: [
          'webpack-dev-server/client?http://0.0.0.0:3001',
          'webpack/hot/only-dev-server',
          'react-hot-loader/patch',
          './css/base.css',
          './src/client/index'
        ]        
    },
    output: {
        path: path.join(rootDir, './dist-client'),
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:3001/'
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
              loader: 'style!css!postcss',
              include: [
                path.join(rootDir, 'css'),
                path.join(rootDir, 'src')
              ]
          }
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {    
      extensions: ['', '.js', '.jsx']
    },
    postcss: function (webpack) {
        return [ 
          require('postcss-import')({
            addDependencyTo: webpack
          }),
          require('precss'),
          require('postcss-cssnext'),
          require('postcss-font-magician')
      ];
    },
    devServer: {
        contentBase: "./src/client/",
        compress: true,
        color: true,
        hot: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        port: '3001',
        headers: { "Access-Control-Allow-Origin": "*" },
        stats: { colors: true }
    }
};