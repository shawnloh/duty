const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: {
    required: [true, 'Username is required'],
    unique: true,
    type: String,
  },
  password: {
    required: [true, 'Password is required'],
    type: String,
  },
  role: {
    required: true,
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  token: String,
}, {timestamps: true});

AccountSchema.pre('save', async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

AccountSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign(
      {_id: user._id},
      process.env.JWT_KEY,
      {expiresIn: '1d'});
  user.token = token;
  await user.save();
  return token;
};

AccountSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.token;
  return user;
};

AccountSchema.statics.findByCredentials = async (username, password) => {
  // Search for a user by email and password.
  const user = await Account.findOne({username}).exec();
  if (!user) {
    return null;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return null;
  }
  return user;
};

// AccountSchema.statics.clearToken = async (token) => {
//   const user = await Account.findOne;
// };

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
