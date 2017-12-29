const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	mongoose.connect('mongodb://localhost/deepscan', {
		useMongoClient: true
	});
} else {
	mongoose.connect(process.env.MONGODB_URI);
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
	console.log('deepscan connection opened in ' + env);
});

const userSchema = new mongoose.Schema({
	username: String,
  password: String
  // classrooms: Array,
  // tests: Array
});

const examSchema = new mongoose.Schema({
	test: String,
  classroom: String,
  answers: Array,
  //this is new
  due: Date
});

const User = mongoose.model('User', userSchema);
const Exam = mongoose.model('Exam', examSchema);

module.exports.User = User;
module.exports.Exam = Exam;