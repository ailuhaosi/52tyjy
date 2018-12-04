var mongoose = require('mongoose');
var User = mongoose.model('users');
var jwt = require("jsonwebtoken");
var myjwt = require('./myjwt.js');
//var db = require('mongodb');



exports.register_html = function (req, res, next) {
    res.render('main_pages/register', {
        layout: false
    });
}


exports.register_check = function (req, res, next) {
    let response = {
        username_: req.body.username
    };
    console.log(response);

    User.find({
        username: response["username_"]
    }, function (err, docs) {
        if (err) {
            console.log('Error,注册时，网页异常');
            res.send('false');
        } else if (docs.length > 0) {
            console.log(docs);
            console.log('用户名已存在，请换其他名字');
            res.send('false');
        } else if (docs.length == 0) {
            console.log('用户名不存在，可以注册');
            res.send('true');
        }
    });

}

exports.register_submit = function (req, res, next) {
    let response = {
        username_: req.body.username,
        password_: req.body.password
    };
    console.log(response);


    var userModel = new User();
    userModel.username = req.body.username;
    userModel.password = req.body.password;
    userModel.save(function (err, user) {
        if (err) console.log('新用户信息保存失败');
        else {
            console.log('新用户信息保存成功');

            //let mypayload = {username: user.username};
            user.token = jwt.sign({
                username: user.username
            }, myjwt.secret, {
                expiresIn: 60 * 60 * 5 //5小时到期时间//user.toJSON()
            });

            user.save(function (err, user1) {
                if (err) console.log('私有密钥保存失败');
                else {
                    console.log('私有密钥保存成功');
                    console.log(user1.token);
                    res.json({
                        type: true,
                        token: user1.token
                    });
                }
            });

        }
    });

}

exports.register_ok_html = function (req, res, next) {
    res.render('main_pages/register_ok', {
        layout: false
    });
}