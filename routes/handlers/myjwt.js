var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var User = mongoose.model('users');

const secret = 'aaa'; //撒盐：加密的时候混淆
exports.secret = secret;


//签发token值
exports.mysign = function (payload) { //payload为json形式

    return jwt.sign(payload, secret, {
        expiresIn: 60 * 60 * 5 //5小时到期时间
    });
}

//解码token值
exports.myverify = function (bearerToken) { //bearerToken为token值，即mysign的值
    jwt.verify(bearerToken, secret, function (err, decoded) {
        if (err) {
            console.log('解码失败');
            return null;
        }
        if (!err) return decoded;

    })
}

//获取cookie
var getCookie = function (name,req) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (req.headers['cookie'] !== undefined) //前端可能请求中不带cookie，导致不能调用req.headers.cookie.match(reg)
    {
        if (arr = req.headers.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    else
        return undefined;
};
//授权中间件:解码前端headers传来的的token值
exports.ensureAuthorized = function ensureAuthorized(req, res, next) {
    let bearerToken;
    //let qqq = req.headers.cookie;
    //console.log('Cookie='+qqq);
    if (req.headers['access-token'] !== undefined) {
        bearerToken = req.headers['access-token'];
    } else if (getCookie('access-token',req) !== undefined) {
        bearerToken = getCookie('access-token',req);
    } else {
        bearerToken = null;
    }
    //let bearerToken = req.headers['access-token']; //"authorization"
    console.log('access-token=' + bearerToken);
    if (typeof bearerToken !== 'undefined') {
        jwt.verify(bearerToken, secret, function (err, decoded) {
            if (err) {
                console.log(err);
                console.log('解码失败');
            }
            if (!err) {
                req.body.username = decoded.username;
                console.log('解码成功：username=' + req.body.username);
            }
        });

        next();
    } else {
        res.sendStatus(403);
    }
}
/* 
exports.myheaders = function (req, res, next) {
    if (req.method != "OPTIONS")
        res.setHeader('access-token', 'newtoken');
    next();
} */
/* //更新token发回前端
        let newtoken = jwt.sign({
            id: req.body._id
        }, secret, {
            expiresIn: 60 * 60 * 5 //5小时到期时间
        });
        console.log('newtoken=' + newtoken);
        User.update({
            _id: req.body._id
        }, {
            token: newtoken
        }, function (err, doc) {
            if (err) {
                console.log('更新newtoken失败');
            } else {
                if (doc) {
                    console.log('找到用户，成功保存newtoken');
                } else {
                    console.log('没找到用户');
                }
            }
        });
*/


//判断用户是否登录
exports.isLogin = function isLogin (req, res, next) {
    let bearerToken;
    if (req.headers['access-token'] !== undefined) {
        bearerToken = req.headers['access-token'];
    } else if (getCookie('access-token', req) !== undefined) {
        bearerToken = getCookie('access-token', req);
    } else {
        bearerToken = null;
    }

    if (typeof bearerToken !== 'undefined') {
        jwt.verify(bearerToken, secret, function (err, decoded) {
            if (err) {
                req.body.islogin = false;
                //console.log(err);
                console.log('用户尚未登录');
            }
            if (!err) {
                req.body.islogin = true;
                req.body.username = decoded.username;
                console.log('用户已经登录');
            }
        });

        next();
    } else {
        req.body.islogin = false;
        console.log('用户尚未登录');
        next();
    }
}