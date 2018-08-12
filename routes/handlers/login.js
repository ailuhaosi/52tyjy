//var path = require('path');
//var all_path = require('./all_path.js');

exports.login_html = function (req, res, next) {
    res.render('login', {
        layout: false
    });
}


//伪数据库数据，以后要用真实数据库替代
SQL_content = [{
        "username": "aaa123456",
        "password": "111111"
    },
    {
        "username": "123456",
        "password": "222222"
    },
    {
        "username": "asdfghj",
        "password": "333333"
    }
];
exports.login_check = function (req, res, next) {
    response = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(response);

    //在数据库中搜索用户名，名字与response["username"]一样是进入下面密码判断。
    if ((SQL_content[0]["username"] == response["username"]) && (SQL_content[0]["password"] == response["password"])) {
        console.log("密码正确");
        res.send("true");
    } else {
        res.send("false"); //
    }
}

exports.login_submit = function (req, res, next) {
    response = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(response);
    res.send(JSON.stringify(response));
}