var mongoose = require('mongoose');
var config = require('./config.js');

module.exports = exports = function () {

    var db = mongoose.connect(config.url, {
        useNewUrlParser: true
    }, function (err) {
        if (err) {
            console.log('Connection Error:' + err)
        } else {
            console.log('Connection success!')
        }
    });

    require('../models/user.server.model.js');
    require('../models/tiku_local_model.js');
    //exports.Other = require('../models/other.server.model.js');
    return db;
};