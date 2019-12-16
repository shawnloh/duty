const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required for point schema'],
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  statusNotAllowed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
  }],
  onlyStatus: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

module.exports = mongoose.model('Point', PointSchema);
