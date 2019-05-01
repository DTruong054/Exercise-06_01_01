var mongoose = require('mongoose');

//Calling a method of mongoose to instantiate an object
module.exports = mongoose.model('User', {
    email:String,
    pwd:String
});