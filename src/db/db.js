const mongoose = require('mongoose');
const Promise = require('bluebird');

// models
const account = require('../models/account');
const status = require('../models/status');
const rank = require('../models/rank');

// Change mongoose promise to use bluebird instead
mongoose.Promise = Promise;

// setting up mongoose connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
    process.env.MONGODB_URL || 'mongodb://localhost:27017/guard_duty',
);


// Init database index for unique
const setupModelsIndex = () => {
  Promise.all([account.init(), status.init(), rank.init()]).then(() => {
    console.log('finished setting up database index');
  });
};

// initiate set up models indexing
setupModelsIndex();
