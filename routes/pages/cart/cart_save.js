var mongoose = require('mongoose');
var User = mongoose.model('users');

exports.post_cart_save = function (req, res, next) {
  if (req.body.islogin === true) {
    User.updateOne({
      username: req.body.username
    }, {
      user_cart_save: req.body.Cart_Modal_contents
    }, function (err, message) {
      if (err) {
        console.log('更新user_cart_save失败');
        res.json({
          type: false,
          data: "Error occured:" + err
        });
      } else {
        if (message) {
          console.log(message);
          console.log('找到用户，成功更新user_cart_save');
          res.json({ ///////////////////////////////返回username,,访问/home?user=username用户个人页面
            type: true
          });
        } else {
          console.log('没找到用户');
          res.json({
            type: false,
            data: "用户登录信息失效，请重新登录"
          });
        }
      }
    });
  } else if (req.body.islogin === false) {
    res.json({
      type: false,
      data: "用户登录信息失效，请重新登录"
    });
  }
}

exports.get_cart_save = function (req, res, next) {

  if (req.body.islogin === true) {
    User.findOne({
      username: req.body.username
    }, function (err, doc) {
      if (err) {
        console.log('查询失败，可能网络异常');
        res.json({
          type: false,
          data: "Error occured:" + err
        });
      } else {
        if (doc) {
          console.log('找到用户');
          res.json({ ///////返回_id,,访问/home:user=_id用户个人页面
            type: true,
            data: doc.user_cart_save 
          });
        } else {
          console.log('登录失效');
          res.json({
            type: false,
            data: "登录失效，购物车信息无法获取，请重新登录"
          });
        }
      }
    });
  }
  else if (req.body.islogin === false)
  {
    res.json({
      type: false,
      data: "用户未登录，购物车信息无法获取，请前往登录"
    });
  }
}