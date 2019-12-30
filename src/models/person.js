const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @class Person
 */
const PersonSchema = new Schema({
  rank: {
    type: Schema.Types.ObjectId,
    ref: 'Rank',
    required: [true, 'Rank is needed for creating a person'],
  },
  platoon: {
    type: Schema.Types.ObjectId,
    ref: 'Platoon',
    required: [true, 'Platoon is needed for creating a person'],
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
  statuses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PersonnelStatus',
    },
  ],
  lastEventDate: {
    type: String,
    default: null,
  },
}, {timestamps: true});

module.exports = mongoose.model('Person', PersonSchema);
