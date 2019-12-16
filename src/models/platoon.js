const mongoose = require('mongoose');

const PlatoonSchema = new mongoose.Schema({
  'name': {
    type: String,
    trim: true,
    uppercase: true,
    required: [true, 'Name is required to create a platoon'],
    unique: true,
  },
}, {timestamps: true});

module.exports = mongoose.model('Platoon', PlatoonSchema);
