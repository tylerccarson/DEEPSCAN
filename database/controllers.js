const db = require('./index.js');

module.exports.findByUsername = function(username, callback) {
  db.User.findOne({ username: username }, function(err, doc) {
  	if (err) {
  		console.log(err);
  		return callback(null, null);
  	}

  	return callback(null, doc);

  });

};

module.exports.findById = function(id, callback) {
	db.User.findOne({ id: id }, function(err, doc) {
		if (err) {
			console.log(err);
			return callback(null, null);
		}

		return callback(null, doc);
	});
};