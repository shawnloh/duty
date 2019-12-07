const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// setting up mongoose connection
mongoose.connect(process.env.db_uri || 'mongodb://localhost:27017/guard_duty', {useNewUrlParser: true});
// set up logger using morgan
app.use(morgan('combined'));

module.exports = app;
