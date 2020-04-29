const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const logger = require('morgan');

const users = require('./routes/api/users');

const app = express();

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);

const db = require('./config/keys').mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB successfully connected'))
	.catch((err) => console.log(err));

module.exports = app;
