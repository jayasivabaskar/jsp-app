var path = require('path');
var webpack = require('webpack');
var express = require('express');
var httpProxy = require('http-proxy');
// var bodyParser = require('body-parser');
var webpackConfig = require('./webpack.dev.js');
// const exp = require('constants');
// const { func } = require('prop-types');

var proxy = httpProxy.createProxyServer({
    changeOrigin: true
});

var port = 3050;
var app = express();
var compiler = webpack(webpackConfig);
app.use(
    require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath
    })
);

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('../dist'));
app.all("/jsb", function(req, res) {
    proxy.web(req, res, {
        target: 'http://hostname:port'
    });
});

// proxy.on("proxyReq", function(proxyReq, req, res, options) {
//     proxyReq.setHeader("USER", "demouser");
// });

proxy.on("error", function(e) {
    console.log('Could not connect to Proxy, please try again...');
});

app.use("*", function(req, res, next) {
    var fileName = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(fileName, function(err, result) {
        if (err) {
            return next(err);
        }
        res.set("content-type", "text/html");
        res.send(result);
        res.end();
    });
});

app.listen(port, function() {
    console.log('server running on port ' + port);
});