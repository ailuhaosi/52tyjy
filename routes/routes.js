var login = require('./handlers/login.js');
var home = require('./handlers/home.js');
var register = require('./handlers/register.js');

module.exports = function (app) {
    app.get('/login', login.login_html);
    app.post('/login_check', login.login_check);
    app.post('/login_submit', login.login_submit);

    app.get('/home', home.home_html);

    app.get('/register', register.register_html);
    app.post('/register_check', register.register_check);
    app.post('/register_submit', register.register_submit);
    app.get('/register_ok', register.register_ok_html);

app.get('/aaa',home.aaa_html);


    // 404 catch-all 处理器（中间件）
    app.use(function (req, res, next) {
        res.status(404);
        res.render('404');
    });
    // 500 错误处理器（中间件）
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500);
        res.render('500');
    });
    //...
};