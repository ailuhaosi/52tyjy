

exports.zujuan123_html = function (req, res, next) {

  if (req.body.islogin === true) res.render('detail_pages/ty_zujuan/zujuan123_logined');// TODO: 使用handerbars的partials组件
  else if (req.body.islogin === false) res.render('detail_pages/ty_zujuan/zujuan123_Unlogined');
}