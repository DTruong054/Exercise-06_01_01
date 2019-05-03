var mongoose = require('mongoose');

//Calling a method of mongoose to instantiate an object
module.exports = mongoose.model('Message', {
    msg: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});