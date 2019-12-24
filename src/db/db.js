const mongoose = require('mongoose');
const Promise = require('bluebird');
const envConfigs = require('./config/config');

// db seed
const seed = require('./seeds/seed');
// models
const account = require('../models/account');
const status = require('../models/status');
const rank = require('../models/rank');
const platoon = require('../models/platoon');
const point = require('../models/point');

// Change mongoose promise to use bluebird instead
mongoose.Promise = Promise;

// setting up mongoose connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];
mongoose.connect(config.url);


// Init database index for unique
const setupModelsIndex = async () => {
  await Promise.all([
    account.init(),
    status.init(),
    rank.init(),
    platoon.init(),
    point.init(),
  ]).then(() => {
    // console.log('finished setting up database index');
  }).catch((error)=>{
    console.log('error setting up database index');
  });

  // Seed database is env is development
  if (env == 'development') {
    // await seed.clearDB();
    // await seed.all();
  };
};

// initiate set up models indexing
setupModelsIndex();


