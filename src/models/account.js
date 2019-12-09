const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  role: {
    required: true,
    type: String,
    num: ["user", "admin"],
    default: "user"
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

AccountSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

AccountSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

AccountSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

AccountSchema.statics.findByCredentials = async (username, password) => {
  // Search for a user by email and password.
  const user = await Account.findOne({ username });
  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return user;
};

// AccountSchema.statics.clearToken = async (token) => {
//   const user = await Account.findOne;
// };

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
