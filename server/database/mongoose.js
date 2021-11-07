var config = require('../config.json').mongodb;
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var options = {
	keepAlive: 300000,
	connectTimeoutMS: 30000,
    user: "root",
	pass: "root",
};
mongoose.connect(config.url, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("mongodb connected");
});

module.exports = mongoose
