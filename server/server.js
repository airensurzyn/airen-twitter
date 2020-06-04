const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const logger = require('./config/logger');
const morgan = require('morgan');
const routes = require('./routes/index');

const app = express();

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/uploads', express.static('uploads'));
app.use('/', routes);

const db = require('./config/keys').mongoURI;

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('MongoDB successfully connected'))
	.catch((err) => console.log(err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	console.log('here');
	res.locals.message = err.message;
	res.locals.error = err;

	// render the error page
	res.status(err.status || 500);
	logger.error({ error: err.stack });
	res.json({ error: err });
});

module.exports = app;
