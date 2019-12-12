const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('./db/db');

const app = express();
// set up logger using morgan
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api/accounts', require('./api/AccountRoutes'));
app.use('/api/events', require('./api/EventRoutes'));

module.exports = app;
