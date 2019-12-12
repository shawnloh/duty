const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
  },
});

module.exports = mongoose.model('Status', StatusSchema);
