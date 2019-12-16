const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  rank: {
    type: Schema.Types.ObjectId,
    ref: 'Rank',
  },
  platoon: {
    type: Schema.Types.ObjectId,
    ref: 'Platoon',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  blockOutDates: {
    type: [String],
    default: [],
  },
  points: [{
    type: Schema.Types.ObjectId,
    ref: 'PersonnelPoint',
  }],
  personnelStatus: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PersonnelStatus',
    },
  ],
}, {timestamps: true});

module.exports = mongoose.model('Person', PersonSchema);
