const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Group name is required'],
    unique: true,
    sparse: true,
    trim: true,
  },
  platoons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Platoon',
  }],
  ranks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rank',
  }],
}, {timestamps: true});

module.exports = mongoose.model('Group', GroupSchema);


