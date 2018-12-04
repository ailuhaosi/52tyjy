var login = require('./handlers/login.js');
//var home = require('./handlers/home.js');
var register = require('./handlers/register.js');
var myjwt = require('./handlers/myjwt.js');
var home = require('./handlers/home.js');
var zujuan = require('./pages/tyzujuan.js');
var question = require('./pages/question.js');
var cart_save = require('./pages/cart/cart_save.js');
var cart_detail = require('./pages/cart/toview_cart_detail.js');
var user_center = require('./pages/UserCenter/user_center_html_render.js');

module.exports = function (app) {
    /*通用页面 */

    //首页
    app.get('/', home.home_html); //未登录的首页
    app.get('/home', home.home_html); //myjwt.isLogin, //TODO:需要权限，若用登录则包含头像等信息;若未登录则是普通home页面。
    //登录
    app.get('/login', login.login_html);
    app.post('/login_check', login.login_check);
    app.post('/login_submit', login.login_submit);
    //注册
    app.get('/register', register.register_html);
    app.post('/register_check', register.register_check);
    app.post('/register_submit', register.register_submit); ///////////////必须改为https
    app.get('/register_ok', register.register_ok_html); ////////////myjwt.ensureAuthorized



    /*详细页面*/

    //知识点组卷
    app.get('/zujuan_knowledges', myjwt.isLogin, zujuan.zujuan123_html);
    //个人中心
    app.get('/user_data', myjwt.isLogin, user_center.user_data);




    /*前端的ajax的数据请求的路由*/

    //ajax题目数据
    app.get('/question', myjwt.isLogin, question.question_ajax);//{ path: '/question', agent: false}

    //ajax购物车数据
    ////更新用户数据库中的购物车信息
    app.post('/cart_save', myjwt.isLogin, cart_save.post_cart_save);
    ////获取用户购物车信息
    app.get('/cart_save', myjwt.isLogin, cart_save.get_cart_save);
    //前往购物车详情页面
    app.get('/toview_cart_detail', myjwt.isLogin, cart_detail.toview_cart_detail);






    //304 第二次请求相同页面
    app.use(function (req, res, next) {
        res.status(304);
        //res.render('main_pages/304');
    });

    //403 forbid处理器
    app.use(function (req, res, next) {
        res.status(403);
        res.render('main_pages/403');
    });

    // 404 catch-all 处理器（中间件）
    app.use(function (req, res, next) {
        res.status(404);
        res.render('main_pages/404');
    });
    // 500 错误处理器（中间件）
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500);
        res.render('main_pages/500');
    });
    //...
};