const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
  quantity: Number,
  personnels: [{
    type: Schema.Types.ObjectId,
    ref: 'Person',
  }],
});

module.exports = mongoose.model('Event', EventSchema);
