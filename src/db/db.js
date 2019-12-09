const mongoose = require('mongoose');

// setting up mongoose connection
mongoose.connect(
    process.env.MONGODB_URL || 'mongodb://localhost:27017/guard_duty',
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
);
