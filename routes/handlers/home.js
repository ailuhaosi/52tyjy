var path = require('path');



exports.home_html = function (req, res, next) {
    res.render('home');
}

exports.aaa_html = function (req, res, next) {
    res.render('aaa', {
        layout: false
    });
}