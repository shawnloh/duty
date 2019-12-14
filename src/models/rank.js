const mongoose = require('mongoose');

const RankSchema = new mongoose.Schema({
  Group: {
    type: String,
    required: [true, 'Group is required'],
    unique: true,
    trim: true,
  },
  Ranks: [String],
});

module.exports = mongoose.model('Rank', RankSchema);


