exports.user_data = function (req, res, next) {
  if (req.body.islogin === true) {
    res.render('detail_pages/UserCenter/user_data');
  }
  else if (req.body.islogin === false) {
    res.render('detail_pages/UserCenter/user_center_unlogined');
  }
}