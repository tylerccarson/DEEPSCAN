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

passport.use('local-login', new Strategy(
	function(username, password, callback) {
		db.User.findOne({username: username})
			.then(user => {
				if (!user) {return callback(null, false);}
				if (user.password !== password) {return callback(null, false);}
				return callback(null, user);
			})
			.catch(err => {
				return callback(err);
			});
	}
));

passport.use('local-signup', new Strategy(
	function(username, password, callback) {
		db.User.findOne({username: username})
			.then(user => {
				if (user) {
					return callback(null, false);
				} else {
					db.User.create({username, password})
						.then(user => {
							return callback(null, user);
						})
						.catch(err => {
							console.log('Fail to create User: ', err);
						});
				}
			})
			.catch(err => {
				console.log('Fail to search for User: ', err);
			});
	}
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.User.findOne({id: id})
  	.then(user => {
  		cb(null, user);
  	})
  	.catch(err => {
  		return cb(err);
  	})
});

const checkIsAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		res.redirect('/login');
	} else {
		next();
	}
};

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
router.use(require('morgan')('tiny'));
router.use(require('cookie-parser')());
router.use(bodyParser.urlencoded({	extended: true }));
router.use(bodyParser.json());
router.use(require('express-session')({ 
	secret: 'keyboard cat', 
	resave: false, 
	saveUninitialized: false })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());

router.get('/', checkIsAuthenticated, (req, res) => {
	console.log(req.headers);
	res.send(200);
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

    console.log('req.session: ', req.session)
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


router.get('/classrooms', (req, res) => {

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

router.get('/tests', (req, res) => {

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

router.get('/key', (req, res) => {

	db.Exam.find({ test: req.query.test, classroom: req.query.classroom }, 'answers', (err, docs) => {
    if (err) {
    	res.error(err);
    }

		res.send(docs[0].answers);
	});

});

router.post('/create/test', (req, res) => {
	
  let body = req.body;

  db.Exam.create({
		test: body.test,
    classroom: body.classroom,
		answers: body.answers
	}, (err, exam) => {
		if (err) {
			res.send(err);
		}
		res.send(exam);
	});

});

router.post('/api/upload', (req, res) => {

	// create an incoming form object
	let form = new formidable.IncomingForm();

	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;

	// store all uploads in the /uploads directory
	form.uploadDir = path.join(__dirname, '/../python/uploads');

	// rename it to input.png
	form.on('file', function (name, file) {

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

	      res.send(results);

	    });
	  	
	  });


	});

	// log any errors that occur
	form.on('error', function (err) {
		console.log('An error has occured: \n' + err);
		res.send(err);
	});

	// parse the incoming request containing the form data
	form.parse(req);

});

router.get('/key', (req, res) => {
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

module.exports = router;