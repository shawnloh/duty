const mongoose = require('mongoose');

const RankSchema = new mongoose.Schema({
  'name': {
    type: String,
    trim: true,
    uppercase: true,
    unique: true,
    required: [true, 'Rank name is required'],
  },
});

module.exports = mongoose.model('Rank', RankSchema);
