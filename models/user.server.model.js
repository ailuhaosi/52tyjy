var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        index: true 
    },
    password: String,
    user_cart_save: JSON,
    token: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }

}, {
    autoIndex: false
});

/* 

UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({
                _id: id
            })
            .exec(cb)
    }
};
 */

//mongoose.model('sessions', UserSchema, 'sessions');
mongoose.model('users', UserSchema, 'users');