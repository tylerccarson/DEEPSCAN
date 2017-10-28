var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	mongoose.connect('mongodb://localhost/deepscan', {
		useMongoClient: true
	});
} else {
	// eventually add AWS DB for cloud
	mongoose.connect('mongodb://admin:password@ds153719.mlab.com:53719/deepscan');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
	console.log('deepscan db opened');
	console.log('Environment: ' + env);
});

var messageSchema = mongoose.Schema({
	message: String
});

var Message = mongoose.model('Message', messageSchema);