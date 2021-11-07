var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'userName' : String,
	'socketId' :String

});

module.exports = mongoose.model('User', userSchema);
