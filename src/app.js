const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('./db/db');

const app = express();
// set up logger using morgan
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/person', require('./routes/person'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/events', require('./routes/events'));
app.use('/api/status', require('./routes/status'));
app.use('/api/points', require('./routes/points'));
app.use('/api/ranks', require('./routes/ranks'));
app.use('/api/platoons', require('./routes/platoons'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
