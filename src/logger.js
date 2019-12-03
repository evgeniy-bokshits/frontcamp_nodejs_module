  
const path = require('path');
const { createLogger, transports, format } = require('winston');

const { combine, timestamp, json, label } = format;
const filename = path.join(__dirname, '/logs/combined.log');

const logger = createLogger({
    level: 'info',
    format: combine(label({ label: 'path' }), timestamp(), json()),
    transports: [
        new transports.File({ filename }),
    ],
});

module.exports = logger;