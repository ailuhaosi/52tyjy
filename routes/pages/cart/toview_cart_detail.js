var mongoose = require('mongoose');
var User = mongoose.model('users');

exports.toview_cart_detail = function (req, res, next) {

  if (req.body.islogin === true) {
    res.render('detail_pages/cart/cart_detail_logined');
  }
  else if (req.body.islogin === false) {
    res.render('detail_pages/cart/cart_detail_unlogined');
  }

}