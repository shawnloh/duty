const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Status', StatusSchema);
