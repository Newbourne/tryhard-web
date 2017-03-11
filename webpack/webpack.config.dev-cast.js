var path = require('path')
var webpack = require('webpack')

var rootDir = path.join(__dirname, './../')

module.exports = {
  context: rootDir,
  entry: {
    client: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      './css/base.css',
      './src/cast/index'
    ]
  },
  output: {
    path: path.join(rootDir, './dist-client'),
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {  importLoaders: 1 }},
          'postcss-loader'
        ]
        // include: [
        //   path.join(rootDir, 'css'),
        //   path.join(rootDir, 'src')
        // ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: './src/client/',
    compress: true,
    //color: true,
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: '3000',
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
  }
}