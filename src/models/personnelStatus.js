const mongoose = require('mongoose');
const moment = require('moment-timezone');
const expiry = require('../utils/expiry');

const personnelStatus = new mongoose.Schema({
  statusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
  },
  startDate: {
    type: String,
    required: [true, 'Start date is required'],
    validate: {
      validator: function(startDate) {
        const start = moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const end = moment(this.endDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        return moment(start).isSameOrBefore(end);
      },
      message: (props) => `${props.value} must be same or before end date!`,
    },
  },
  endDate: {
    type: String,
    required: [true, 'End date is required'],
    validate: {
      validator: function(endDate) {
        const start = moment(this.startDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const end = moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        return moment(start).isSameOrBefore(end);
      },
      message: (props) => `${props.value} must be same or after start date!`,
    },
  },
  expired: {
    type: Boolean,
    required: [true, 'expired is required'],
    default: false,
  },
});

personnelStatus.pre('save', function(next) {
  this.expired = expiry.statusBeforeToday(this.endDate);
  next();
});

module.exports = mongoose.model('PersonnelStatus', personnelStatus);
