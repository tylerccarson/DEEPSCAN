const express = require('express');
const bodyParser = require('body-parser');
const PythonShell = require('python-shell');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const db = require('../database/index.js');

const app = express();

const pythonPath = process.env.NODE_ENV ? 'python' : __dirname + '/../.env/bin/python2.7';

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('Listening on port ' + port + '...');
});


//routes
app.get('/*', (req, res) => {
  res.redirect('/');
});

app.post('/create/test', (req, res) => {
	
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

app.post('/api/upload', (req, res) => {

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

app.get('/exams', (req, res) => {
	db.Exam.find({}, 'exam number section', (err, docs) => {
    if (err) {
    	res.error(err);
    }
		console.log('fetched all exams');
		res.send(docs);
	});
});

app.get('/key', (req, res) => {
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
