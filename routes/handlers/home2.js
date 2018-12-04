var path = require('path');
var mongoose = require('mongoose');
var User = mongoose.model('users');


exports.home_html = function (req, res, next) {

    User.findOne({
        username: req.body.username //前端login页面submit时，需要发送
    }, function (err, user) {
        if (err) {
            console.log('home_html登录错误');
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) res.render('main_pages/home_logined'); /////////////////根据不同用户,传参数,参数如user._id,user.images///res.render('home',{...})
            else res.render('main_pages/403');

        }
    });



}