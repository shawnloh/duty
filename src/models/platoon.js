const mongoose = require('mongoose');

const PlatoonSchema = new mongoose.Schema({
  'name': {
    type: String,
    trim: true,
    uppercase: true,
    required: [true, 'Platoon name is required'],
    unique: true,
  },
});

module.exports = mongoose.model('Platoon', PlatoonSchema);
