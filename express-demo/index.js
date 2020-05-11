// Dependency Modules (1. joi & 2. express)
// since video was made in 2018 Joi has been deprecated.  @hapi/joi is its replacement.
// joi.validate does not work w/ @hapi/joi
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('@hapi/joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

// Pug returns html markup to the client.  Is a view engine.
app.set('view engine', 'pug');
app.set('views', './views'); // default.  (Optional)

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

// if app environment is development we will enable morgan.  (Only want to use morgan in development, not production environment)
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Mogan enabled...');
}

app.use(logger);


// PORT -means if there is a port use that, otherwise use 3000.
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}...`));