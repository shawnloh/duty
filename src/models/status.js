const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
    unique: true,
    trim: true,
  },
}, {timestamps: true});

module.exports = mongoose.model('Status', StatusSchema);
