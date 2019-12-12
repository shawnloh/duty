const mongoose = require('mongoose');

const RankSchema = new mongoose.Schema({
  RankCategory: {
    type: String,
    required: [true, 'Rank Category is required'],
  },
  Ranks: [String],
});

module.exports = mongoose.model('Rank', RankSchema);


