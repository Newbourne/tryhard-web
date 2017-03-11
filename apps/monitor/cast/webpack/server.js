var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config.dev')

new WebpackDevServer(webpack(config), config.devServer)
    .listen(config.devServer.port, config.devServer.host, function (err, result) {
      if (err) {
        console.log(err)
      }
      console.log('Listening at localhost:' + config.devServer.port)
    })
