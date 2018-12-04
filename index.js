var express = require('express');

var http = require('http');
var https = require('https');

//http.globalAgent.maxSockets = Infinity; //var req = http.request(options);
//https.globalAgent.maxSockets = Infinity; //var req = https.request(options);

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var compression = require('compression');

var bodyParser = require('body-parser');
var morgan = require("morgan");
var jwt = require("jsonwebtoken");

var app = express();
var httpServer = http.createServer(app);
var fs = require('fs');
var privateKey = fs.readFileSync('./cert/cert-1542154204317_52tyjy.com.key', 'utf8');
var certificate = fs.readFileSync('./cert/cert-1542154204317_52tyjy.com.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

var httpsServer = https.createServer(credentials, app);

// 设置 handlebars 视图引擎。默认创建view文件夹、layouts文件夹。
var handlebars = require('express-handlebars')
    .create({
        partialsDir: "views/partials/",
        layoutsDir: "views/layouts/",
        defaultLayout: 'main',
        //extname: '.hbs',
        helpers: {
            noop: function (options) {
                return options.fn(this);
            }, //return options.fn(this); 块级helper：只是执行一下跟没有一样
            section: function (name, options) {
                if (!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    });
app.engine('handlebars', handlebars.engine); //将模板引擎扩展名设置为第一个参数
app.set('view engine', 'handlebars'); //第二个参数与上面扩展名对应
//process.env.NODE_ENV = 'production';//TODO:上线时修改
app.set('port', process.env.PORT || 3000); //3000

app.use(compression());//压缩中间件,提高网页性能
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan("dev"));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Cache-Control', 'public, max-age=86400');//为每个网页请求头设置静态文件缓存。
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,access-token');//Authorization
    next();
});




//数据库接入
var db = require('./config/mongoose.js')();




//调用所有页面路由
require('./routes/routes.js')(app);



//防止程序出错时崩溃
process.on('uncaughtException', function (err) {
    console.log(err);
});

/* httpsServer.listen(process.env.PORT || 3000, function () {
    console.log('Express started on https://localhost:' +
        3000 + '; press Ctrl-C to terminate.');
});
 */
/* httpServer.listen(process.env.PORT || 2000, function () {
    console.log('Express started on http://localhost:' +
        2000 + '; press Ctrl-C to terminate.');
}); */

/* httpsServer.listen(app.get('port'), function () {
    console.log('Express started on https://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
}); */



if (cluster.isMaster) {
    // Fork启一个Worker 进程
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('listening', (worker, address) => {
        console.log('worker ' + worker.process.pid + ', listen: ' + address.address + ":" + address.port);
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log('worker ' + worker.process.pid + ' died');
        //重启一个worker进程
        cluster.fork();
    });
} else {
    // Worker 进程之间可以共享任何形式的TCP连接
    // 也可以启动一个express的web服务
    httpsServer.listen(app.get('port'), function () {
        console.log('Express started on https://localhost:' +
            app.get('port') + '; press Ctrl-C to terminate.');
    });
}