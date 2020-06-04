const { createLogger, transports, format } = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');

const loggingWinston = new LoggingWinston();

const logger = createLogger({
	transports: [
		new transports.Console({
			level: 'info',
		}),
		loggingWinston,
	],
});

logger.error('Logger is logging....');

module.exports = logger;
