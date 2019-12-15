const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonnelPoint = new Schema({
  personId: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
  },
  pointId: {
    type: Schema.Types.ObjectId,
    ref: 'Point',
  },
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('PersonnelPoint', PersonnelPoint);
