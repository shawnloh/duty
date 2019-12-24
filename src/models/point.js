const Promise = require('bluebird');
const mongoose = require('mongoose');
const PersonnelPoint = require('./personnelPoint');
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

PointSchema.pre('remove', {query: true}, async function() {
  const current = this;
  const found = await PersonnelPoint.find({pointId: current._id}).exec();

  Promise.all(found.map(async (doc) => {
    await doc.remove();
  }));
});

module.exports = mongoose.model('Point', PointSchema);
