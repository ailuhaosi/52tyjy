//var path = require('path');
//var all_path = require('./all_path.js');
var mongoose = require('mongoose');
var User = mongoose.model('users');
var jwt = require("jsonwebtoken");
var myjwt = require('./myjwt.js');



exports.login_html = function (req, res, next) {
    res.render('main_pages/login', {
        layout: false
    });
}


exports.login_check = function (req, res, next) {
    response = {
        username_: req.body.username,
        password_: req.body.password
    };
    console.log(response);

    User.find({
        username: response["username_"]
    }, function (err, docs) {
        if (err) {
            console.log('Error,登录时，网页异常');
            res.send('false');
        } else if (docs.length == 1) {
            if (docs[0].password == response["password_"]) {
                console.log("密码正确");
                res.send("true");
            } else {
                console.log("密码错误");
                res.send("false");
            }
        } else if (docs.length == 0) {
            console.log('用户名不存在，请注册');
            res.send('false');
        }
    });

}

exports.login_submit = function (req, res, next) {
    let response = {
        username_: req.body.username
    };
    console.log(response);


    //更新token发回前端
    let newtoken = jwt.sign({
        username: req.body.username
    }, myjwt.secret, {
        expiresIn: 60 * 60 * 5 //5小时到期时间
    });
    console.log('newtoken=' + newtoken);
    User.updateOne({
        username: req.body.username
    }, {
        token: newtoken
    }, function (err, message) {
        if (err) {
            console.log('更新newtoken失败');
            res.json({
                type: false,
                data: "Error occured:" + err
            });
        } else {
            if (message) {
                console.log(message);
                console.log('找到用户，成功更新token值');
                res.json({ ///////////////////////////////返回username,,访问/home?user=username用户个人页面
                    type: true,
                    token: newtoken
                });
            } else {
                console.log('没找到用户');
                res.json({
                    type: false,
                    data: "Incorrect username/password"
                });
            }
        }
    });

    /* 
        User.findOne({
            username: req.body.username
        }, function (err, doc) {
            if (err) {
                console.log('111');
                res.json({
                    type: false,
                    data: "Error occured:" + err
                });
            } else {
                if (doc) {
                    console.log('222');
                    //将更新的newtoken发回前端
                     res.set({
                        'Content-Type': 'text/html;charset=utf-8',
                        'access-token': newtoken
                    }); 
                       
                    res.setHeader('access-token', newtoken);
                    res.json({///////返回_id,,访问/home:user=_id用户个人页面
                        type: true,
                        data: doc,
                        token: doc.token
                    });
                } else {
                    console.log('333');
                    res.json({
                        type: false,
                        data: "Incorrect username/password"
                    });
                }
            }
        }); */
    //res.send(JSON.stringify(response));
}





exports.ensureAuthorized = function ensureAuthorized(req, res, next) {
    var bearerToken = req.headers['access-token']; //"authorization"
    console.log(bearerToken);
    if (typeof bearerToken !== 'undefined') {

        req.body.token = bearerToken;

        jwt.verify(bearerToken, 'aaa', function (err, decoded) {
            if (err) {
                //console.log(err);
                console.log('解码失败,前端取cookie中的token会不会取错');
                //return null;
            }
            if (!err) {
                console.log('decoded:_id=' + decoded.id + ';;'); //会输出123，如果过了60秒，则有错误。
                req.body._id = decoded.id;
            }
        })

        next();
    } else {
        res.sendStatus(403);
    }
}