
exports.register_html = function (req, res, next) {
    res.render('register', {
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

exports.register_check = function (req, res, next) {
    response = {
        username: req.body.username       
    };
    console.log(response);

    //在数据库中搜索用户名，名字与response["username"]一样是进入下面密码判断。
    if (SQL_content[0]["username"] == response["username"]) {
        console.log("用户名已存在");
        res.send("false");
    } else {
        res.send("true"); //
    }
}

exports.register_submit = function (req, res, next) {
    response = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(response);
    res.send(JSON.stringify(response));
}

exports.register_ok_html = function (req, res, next) {
    res.render('register_ok', {
        layout: false
    });
}