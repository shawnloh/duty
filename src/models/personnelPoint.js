const mongoose = require('mongoose');
const Person = require('./person');
const Schema = mongoose.Schema;

const PersonnelPoint = new Schema({
  pointSystem: {
    type: Schema.Types.ObjectId,
    ref: 'Point',
  },
  personId: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
  },
  points: {
    type: Number,
    default: 0,
  },
}, {timestamps: true});

PersonnelPoint.pre('save', {query: true}, async function() {
  const current = this;
  const currentPerson = await Person.findOne({_id: current.personId}).exec();
  if (!currentPerson) {
    throw new Error('Invalid person id');
  }

  const isInArray = currentPerson.points.some((point) => {
    return point.equals(current._id);
  });

  if (!isInArray) {
    currentPerson.points.push(current._id);
  }
  await currentPerson.save();
});

PersonnelPoint.pre('remove', {query: true}, async function() {
  const current = this;
  await Person.updateOne(
      {_id: current.personId},
      {$pull: {'points': current._id}})
      .exec();
});

module.exports = mongoose.model('PersonnelPoint', PersonnelPoint);
