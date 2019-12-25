const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Person = require('./person');
const expiry = require('../utils/expiry');

const personnelStatus = new mongoose.Schema({
  statusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
  },
  personId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
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
}, {timestamps: true});

personnelStatus.pre('save', {query: true}, async function() {
  const current = this;
  current.expired = expiry.statusBeforeToday(this.endDate);
  const currentPerson = await Person.findById(current.personId).exec();
  if (!currentPerson) {
    throw new Error('Invalid person id');
  }
  const isInArray = currentPerson.statuses.some((status) => {
    return status.equals(current._id);
  });

  if (!isInArray) {
    currentPerson.statuses.push(current._id);
  }
  await currentPerson.save();
});

personnelStatus.pre('remove', {query: true}, async function() {
  const current = this;
  await Person.updateOne(
      {_id: current.personId},
      {$pull: {'statuses': current._id}}).exec();
});

module.exports = mongoose.model('PersonnelStatus', personnelStatus);
