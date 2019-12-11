const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
  },
  canDoGuardDuty: {
    type: Boolean,
    required: 'Please select true or false for this',
  },
});

module.exports = mongoose.model('Status', StatusSchema);
