var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

if (process.env.APP_ENV == 'cast'){
	var config = require('./webpack.config.dev-cast');
} else {
	var config = require('./webpack.config.dev-client');
}

new WebpackDevServer(webpack(config), config.devServer)
    .listen(config.devServer.port, config.devServer.host, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:' + config.devServer.port);
    });