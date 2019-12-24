const Promise = require('bluebird');
const mongoose = require('mongoose');
const personnelStatus = require('./personnelStatus');

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
    unique: true,
    trim: true,
  },
}, {timestamps: true});

StatusSchema.pre('remove', {query: true}, async function() {
  const current = this;
  const statuses = await personnelStatus
      .find({statusId: current._id})
      .exec();
  Promise.all(statuses.map(async (status) => {
    await status.remove();
  }));
});

module.exports = mongoose.model('Status', StatusSchema);
