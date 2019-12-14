const mongoose = require('mongoose');
const Promise = require('bluebird');

// models
const account = require('../models/account');
const status = require('../models/status');

// Change mongoose promise to use bluebird instead
mongoose.Promise = Promise;

// setting up mongoose connection
mongoose.connect(
    process.env.MONGODB_URL || 'mongodb://localhost:27017/guard_duty',
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
);

// Init database index for unique
const setupModelsIndex = () => {
  Promise.all([account.init(), status.init()]).then(() => {
    console.log('finished setting up database index');
  });
};

setupModelsIndex();
