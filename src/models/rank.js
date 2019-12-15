const mongoose = require('mongoose');

const RankSchema = new mongoose.Schema({
  group: {
    type: String,
    required: [true, 'Group is required'],
    unique: true,
    sparse: true,
    trim: true,
  },
  ranks: [String],
});

module.exports = mongoose.model('Rank', RankSchema);


