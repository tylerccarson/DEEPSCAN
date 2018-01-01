const express = require('express');
const app = express();
const routes = require('./routes.js');
const seeds = require('../database/seeds.js');
const path = require('path');

app.use(express.static(__dirname + '/../client/dist', {
	index: false
}));

app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('Listening on port ' + port + '...');
});