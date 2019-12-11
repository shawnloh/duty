const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    required: [true, 'Event Name is required'],
    type: String,
  },
  date: {
    required: [true, 'Date is required'],
    type: Date,
  },
  pioneerQuantity: {
    type: Number,
    required: [true, 'Pioneer(s) quantity is required'],
    default: 0,
  },
  wspecsQuantity: {
    type: Number,
    required: [true, 'Specialist(s) quantity is required'],
    default: 0,
  },
  officerQuantity: {
    type: Number,
    required: [true, 'Officer(s) quantity is required'],
    default: 0,
  },
  personnels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
  createdAt: {
    type: Date,
    default: {type: Date, default: Date.now},
  },
  lastModified: {
    type: Date,
    default: {type: Date, default: Date.now},
  },
});

module.exports = mongoose.model('Event', EventSchema);
