var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// 设置 handlebars 视图引擎。默认创建view文件夹、layouts文件夹。
var handlebars = require('express3-handlebars')
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

app.set('port', process.env.PORT || 3000); //3000


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


//调用所有页面路由
require('./routes/routes.js')(app);



app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});