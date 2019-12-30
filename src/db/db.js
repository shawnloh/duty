const mongoose = require('mongoose');
const Promise = require('bluebird');
const path = require('path');
const loadModules = require('../utils/loadmodules');
const envConfigs = require('./config/config');

// db seed
// const seed = require('./seeds/seed');

// models
// const account = require('../models/account');
// const event = require('../models/event');
// const person = require('../models/person');
// const personnelPoint = require('../models/personnelPoint');
// const personnelStatus = require('../models/personnelStatus');
// const platoon = require('../models/platoon');
// const point = require('../models/point');
// const rank = require('../models/rank');
// const status = require('../models/status');

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
  try {
    const dbModels = loadModules(path.join(__dirname, '..', 'models'));
    await Promise.all(Object.keys(dbModels).map((key) => {
      return dbModels[key].init();
    }));

    console.log('Finished models indexing');
    if (env == 'development') {
    // await seed.clearDB();
    // await seed.all();
    };
  } catch (error) {
    console.error(error);
    console.log('Error setting up database index');
  }
};

// initiate set up models indexing
setupModelsIndex();


