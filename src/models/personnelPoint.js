const mongoose = require('mongoose');
const Person = require('./person');
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
}, {timestamps: true});

PersonnelPoint.pre('save', {query: true}, async function() {
  const current = this;
  const currentPerson = await Person.findById(current.personId).exec();
  if (!currentPerson) {
    throw new Error('Invalid person id');
  }
  currentPerson.points.push(current._id);
  await currentPerson.save();
});

PersonnelPoint.pre('remove', {query: true}, async function() {
  const current = this;
  await Person.updateOne(
      {_id: current.personId},
      {
        $pull: {
          'points': current._id,
        },
      }).exec();
});

module.exports = mongoose.model('PersonnelPoint', PersonnelPoint);
