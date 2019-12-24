const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  rank: {
    type: Schema.Types.ObjectId,
    ref: 'Rank',
    required: [true, 'Rank is needed for creating a person'],
  },
  platoon: {
    type: Schema.Types.ObjectId,
    ref: 'Platoon',
    required: [true, 'Platoon is needed for creating a person'],
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  blockOutDates: {
    type: [String],
    default: [],
  },
  points: [{
    type: Schema.Types.ObjectId,
    ref: 'PersonnelPoint',
  }],
  statuses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PersonnelStatus',
    },
  ],
}, {timestamps: true});

PersonSchema.pre('remove', {query: true}, function(next) {
  this.model('PersonnelPoint').remove({personId: this._id}, next);
  this.model('PersonnelStatus').remove({personId: this._id}, next);
});

module.exports = mongoose.model('Person', PersonSchema);
