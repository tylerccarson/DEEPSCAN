var express = require('express');
var bodyParser = require('body-parser');
var PythonShell = require('python-shell');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var db = require('../database/index.js');
var mock_answers = require('./mock_data/mock_answers.js');

var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

var port = process.env.PORT || 3030;
app.listen(port, () => {
	console.log('Listening on port ' + port + '...');
});


// this function would best be factored out into a microservice, running on its own separate server that could then be scaled
// so-- turn that image processor into its own API; thus, other applications could use it as well.

//routes
app.post('/api/upload', function (req, res) {

	// create an incoming form object
	var form = new formidable.IncomingForm();

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

	    var options = {
	    	mode: 'text',
	    	pythonPath: __dirname + '/../.env/bin/python2.7',
	    	pythonOptions: ['-u'],
	    	scriptPath: __dirname + '/../python/',
	    	args: []
	    };

	    PythonShell.run('deep_scan.py', options, (err, results) => {

	    	if (err) throw err;

	    	console.log('response from python script: ', results);
	      res.send(results);

	      //mocking option:
	      // console.log('sending mock data for reading section');
	      // let mock = mock_answers.sat_1_reading
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
