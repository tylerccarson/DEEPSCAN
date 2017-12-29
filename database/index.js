var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	mongoose.connect('mongodb://localhost/deepscan', {
		useMongoClient: true
	});
} else {
	mongoose.connect(process.env.MONGODB_URI);
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
	console.log('deepscan db opened');
	console.log('Environment: ' + env);
});

var examSchema = new mongoose.Schema({
	test: String,
  classroom: String,
  answers: Array 
});

var Exam = mongoose.model('Exam', examSchema);

//seed data
Exam.find({
  test: 'SAT_Reading_1',
  classroom: 'SST'
}, (err, docs) => {
	if (err) {
		return handleError(err);
	}
	if (!docs.length) {

		let input = [
	    'B', 'B', 'C', 'A', 'C', 'D', 'D', 'B', 'C', 'B', 'A',
	    'B', 'D', 'A', 'A', 'C', 'C', 'D', 'A', 'B', 'A', 'B',
	    'D', 'D', 'C', 'B', 'D', 'C', 'A', 'A', 'D', 'B', 'A', 
	    'C', 'B', 'D', 'C', 'C', 'B', 'C', 'B', 'B', 'A', 'A',
	    'D', 'C', 'B', 'A', 'D', 'B', 'D', 'A'
	  ];

	  let transformed = input.map((element) => {
	  	return {
        letter: element,
        comments: ''
      };
	  });

		Exam.create({
			test: 'SAT_Reading_1',
      classroom: 'SST',
			answers: transformed
		}, (err, exam) => {
			if (err) {
				return handleError(err);
			}
			console.log('SAT 1 Reading seeded');
		})
	} else {
		console.log('SAT 1 Reading already seeded')
	}
});

Exam.find({
  test: 'SAT_Writing_1',
  classroom: 'SST'
}, (err, docs) => {
	if (err) {
		return handleError(err);
	}
	if (!docs.length) {

		let input = [
			'D', 'B',	'A', 'C',	'C', 'D',	'B', 'C',	'A', 'A',	'B',
			'B', 'A', 'B', 'C', 'C', 'C', 'A', 'D', 'D', 'B', 'D',
			'D', 'D', 'B', 'A', 'B', 'C', 'B', 'D', 'C', 'A', 'A',
			'A', 'A', 'B', 'D', 'C', 'A', 'B', 'B', 'C', 'D', 'D'
	  ];

	  let transformed = input.map((element) => {
	  	return {
        letter: element,
        comments: ''
      };
	  });

		Exam.create({
			test: 'SAT_Writing_1',
      classroom: 'SST',
			answers: transformed
		}, (err, exam) => {
			if (err) {
				return handleError(err);
			}
			console.log('SAT 1 Writing seeded');
		})
	} else {
		console.log('SAT 1 Writing already seeded')
	}
});

Exam.find({
  test: 'SAT_Math_No_Calculator_1',
  classroom: 'SST'
}, (err, docs) => {
	if (err) {
		return handleError(err);
	}
	if (!docs.length) {

		let input = [
	    'D', 'A', 'C', 'B', 'C', 'A', 'B', 'C', 'B', 'A',
	    'D', 'D', 'B', 'A', 'D', 2, 1600, 7, 0.8, 100
	  ];

	  let transformed = input.map((element) => {
	  	return {
        letter: element,
        comments: ''
      };
	  });

		Exam.create({
			test: 'SAT_Math_No_Calculator_1',
      classroom: 'SST',
			answers: transformed
		}, (err, exam) => {
			if (err) {
				return handleError(err);
			}
			console.log('SAT 1 Math No Calc seeded');
		})
	} else {
		console.log('SAT 1 Math No Calc already seeded')
	}
});

Exam.find({
  test: 'SAT_Math_Calculator_1',
  classroom: 'SST'
}, (err, docs) => {
	if (err) {
		return handleError(err);
	}
	if (!docs.length) {

		let input = [
	    'B', 'C', 'D', 'C', 'D', 'D', 'C', 'D', 'A', 'B',
	    'A', 'C', 'C', 'C', 'A', 'C', 'B', 'A', 'B', 'D',
	    'C', 'B', 'B', 'A', 'D', 'B', 'C', 'C', 'D', 'D', 
	    5, 107, 0.625, 96, 6, 3, 1.02, 6.11
	  ];

	  let transformed = input.map((element) => {
	  	return {
        letter: element,
        comments: ''
      };
	  });

		Exam.create({
			test: 'SAT_Math_Calculator_1',
      classroom: 'SST',
			answers: transformed
		}, (err, exam) => {
			if (err) {
				return handleError(err);
			}
			console.log('SAT 1 Math Calc seeded');
		})
	} else {
		console.log('SAT 1 Math Calc already seeded')
	}
});

module.exports.Exam = Exam;