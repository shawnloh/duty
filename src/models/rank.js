const mongoose = require('mongoose');

const RankSchema = new mongoose.Schema({
  'name': {
    type: String,
    trim: true,
    uppercase: true,
    unique: true,
    required: [true, 'Name is required to create a rank'],
  },
}, {timestamps: true});

module.exports = mongoose.model('Rank', RankSchema);
