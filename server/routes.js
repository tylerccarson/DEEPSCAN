const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const PythonShell = require('python-shell');
const pythonPath = process.env.NODE_ENV ? 'python' : __dirname + '/../.env/bin/python2.7';
const db = require('../database/index.js');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();

passport.use('local-login', new Strategy(
	function(username, password, callback) {
		process.nextTick(() => {
			db.User.findOne({username: username})
				.then(user => {
					if (!user) {return callback(null, false);}
					bcrypt.compare(password, user.password, function(err, isMatch) {
						if (err) {return callback(null, false);}
						if (isMatch) {return callback(null, user);}
					});
				})
				.catch(err => {
					return callback(err);
				});
		})
	}
));

passport.use('local-signup', new Strategy(
	function(username, password, callback) {
		process.nextTick(() => {
			db.User.findOne({username: username})
				.then(user => {
					if (user) {
						return callback(null, false);
					} else {
						bcrypt.genSalt(10, function(err, salt) {
							bcrypt.hash(password, salt, function(err, hash) {
								db.User.create({username: username, password: hash})
									.then(user => {
										return callback(null, user);
									})
									.catch(err => {
										console.log('Fail to create User: ', err);
									});
							})
						})
					}
				})
				.catch(err => {
					console.log('Fail to search for User: ', err);
				});
		});
	}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id)
  	.then(user => {
  		return done(null, user);
  	})
  	.catch(err => {
  		done(null, null);
  	})
});

const verify = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
};

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
router.use(require('morgan')('tiny'));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(session({
	//possibly for deployment, needed for running a cluster
	// store: new RedisStore({
 //    client: redisClient,
 //    host: 'localhost',
 //    port: 6379
	// }),
	secret: 'keyboard cat', 
	resave: true, 
	saveUninitialized: true
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());

router.get('/', verify, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

router.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist/login.html'));
});

router.get('/signup', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist/signup.html'));
});

router.post('/login',
	passport.authenticate('local-login', { failureRedirect: '/login' }),
	(req, res) => {
    res.redirect('/');
	});

router.post('/signup',
	passport.authenticate('local-signup', { failureRedirect: '/signup' }),
	(req, res) => {
		res.redirect('/');
	});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/classrooms', verify, (req, res) => {

	//console.log('session data: ', req.session);

	db.Exam.find({}, 'classroom', (err, docs) => {
    if (err) {
    	res.error(err);
    }

    let classrooms = {};

    for (var i = 0; i < docs.length; i++) {

    	let classroom = docs[i].classroom;
    	if (classrooms[classroom] === undefined && classroom !== undefined) {
    		classrooms[classroom] = i;
    	}
    }

    classrooms = Object.keys(classrooms);
		res.send(classrooms);
	});

});

router.get('/tests', verify, (req, res) => {

	db.Exam.find({ classroom: req.query.classroom }, 'test', (err, docs) => {
    if (err) {
    	res.error(err);
    }

    let tests = {};

    for (var i = 0; i < docs.length; i++) {

    	let test = docs[i].test;
    	if (tests[test] === undefined && test !== undefined) {
    		tests[test] = i;
    	}
    }

    tests = Object.keys(tests);

		res.send(tests);
	});

});

router.get('/key', verify, (req, res) => {

	db.Exam.find({ test: req.query.test, classroom: req.query.classroom, type: 'teacher' }, 'answers', (err, docs) => {
    if (err) {
    	res.error(err);
    }

		res.send(docs[0].answers);
	});

});

router.post('/create/test', verify, (req, res) => {
	
  let body = req.body;

  db.Exam.create({
		test: body.test,
    classroom: body.classroom,
		answers: body.answers,
		user: req.session.passport.user,
		type: 'teacher'

	}, (err, exam) => {
		if (err) {
			res.send(err);
		}
		res.send(exam);
	});

});

router.post('/api/upload', verify, (req, res) => {


	// let test;
	// let classroom;
	// let answers;
	// let student = req.session.passport.user;

	// create an incoming form object
	let form = new formidable.IncomingForm();

	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;

	// store all uploads in the /uploads directory
	form.uploadDir = path.join(__dirname, '/../python/uploads');

	// parse the incoming request containing the form data
	form.parse(req, function(err, fields, files) {

		let classroom = fields.Classroom;
		let test = fields.Test;
		let student = req.session.passport.user;
		let file = files.File;

		fs.rename(file.path, path.join(form.uploadDir, 'input.jpg'), (err) => {

	  	if (err) {
	  		console.log(err);
	  	}

	    let options = {
	    	mode: 'json',
	    	pythonPath: pythonPath,
	    	pythonOptions: ['-u'],
	    	scriptPath: __dirname + '/../python/',
	    	args: []
	    };

	    PythonShell.run('deep_scan.py', options, (err, results) => {

	    	if (err) throw err;

	    	db.Exam.create({
	    		test: test,
	    		classroom: classroom,
	    		answers: results[0],
	    		user: student,
	    		type: 'student'

	    	}, (err, exam) => {
	    		if (err) {
	    			res.send(err);
	    		}
    
          res.send(exam);

	    	});

	    });

    });

    if (err) res.send(err);

	});

	// log any errors that occur
	form.on('error', function (err) {
		console.log('An error has occured: \n' + err);
		res.send(err);
	});

});

router.get('/key', verify, (req, res) => {
	db.Exam.findOne({
    exam: req.query.exam,
    number: req.query.version,
    section: req.query.section
	}, 'answers', (err, docs) => {
		if (err) {
			res.error(err);
		}
		res.send(docs.answers);
	});
});

router.get('/*', verify, (req, res) => {
	res.redirect('/');
});

module.exports = router;