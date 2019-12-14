const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required for point schema'],
  },
  ranks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rank',
  }],
  statusNotAllowed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
  }],
  onlyStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Point', PointSchema);
