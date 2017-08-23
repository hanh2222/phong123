/*
	mongo free trên https://mlab.com
*/


var mongoose = require('mongoose');
	autoIncrement = require('mongoose-auto-increment');
	var dbOpt = { 
    useMongoClient: true
} 
mongoose.Promise = global.Promise 
var  connection=  mongoose.connect('mongodb://hanh1234:hanh1234@ds149743.mlab.com:49743/phong',dbOpt);

autoIncrement.initialize(connection);
var Schema = new mongoose.Schema ({
	feedid : String
});
Schema.plugin(autoIncrement.plugin, 'feedid');

var ghichu = connection.model('feedid', Schema);







module.exports = mongoose.model('feedid',Schema)