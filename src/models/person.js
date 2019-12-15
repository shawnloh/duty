const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  rank: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  platoon: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
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
});

module.exports = mongoose.model('Person', PersonSchema);
