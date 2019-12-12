const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  rank: {
    type: String,
    required: true,
  },
  platoon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dutyPoints: [{
    pointType: {
      type: Schema.Types.ObjectId,
      ref: 'point',
    },
    points: {
      type: Number,
      default: 0,
    },
  }],
  blockOutDates: {
    type: [Date],
    default: [],
  },
  status: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PersonnelStatus',
    },
  ],
});

module.exports = mongoose.model('Person', PersonSchema);
