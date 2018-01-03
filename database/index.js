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
  //possibly add first, last, and email for future use
});

const examSchema = new mongoose.Schema({
	test: String,
  classroom: String,
  answers: Array,
  score: Number, //String???
  //for future use:
  dueDate: Date,
  updated: { type: Date, default: Date.now },
  //
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String //'teacher', or 'student' 
});

const User = mongoose.model('User', userSchema);
const Exam = mongoose.model('Exam', examSchema);

module.exports.User = User;
module.exports.Exam = Exam;