const mongoose = require('mongoose');

const personnelStatus = new mongoose.Schema({
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },
  expired: {
    type: Boolean,
    required: [true, 'expired is required'],
    default: false,
  },
});

module.exports = mongoose.model('PersonnelStatus', personnelStatus);
