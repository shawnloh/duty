const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  role: {
    required: true,
    type: String,
    num: ['user', 'admin'],
    default: 'user',
  },
});

module.exports = mongoose.model('Account', AccountSchema);
