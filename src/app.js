const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('./db/db');

const app = express();
// set up logger using morgan
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/events', require('./routes/events'));
app.use('/api/status', require('./routes/status'));

module.exports = app;
