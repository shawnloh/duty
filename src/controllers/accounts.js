const Account = require("../models/account");

module.exports.login = async (req, res, next) => {
  // Login a registered user
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(401)
        .json({ errors: ["Login failed! Check authentication credentials"] });
    }

    const user = await Account.findByCredentials(username, password);

    if (!user) {
      return res
        .status(401)
        .json({ errors: ["Login failed! Check authentication credentials"] });
    }
    // if (process.env.NODE_ENV !== 'test') {
    const ipAddr = req.headers["x-forwarded-for"];
    if (ipAddr) {
      user.lastLoginIp = ipAddr;
    } else {
      user.lastLoginIp = req.connection.remoteAddress;
    }
    // }

    await user.save();
    // const token = await user.generateAuthToken();
    req.session.user = { _id: user._id };
    res.status(200).json({ message: "success" });
    // res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const user = await Account.findOne({ _id: req.session.user._id }).exec();
    if (user.role != "admin") {
      return res
        .status(403)
        .json({ errors: ["You need to be admin to register an account"] });
    }
    // const account = new Account(req.body);
    const account = await Account.create(req.body);
    // const token = await account.generateAuthToken();
    res.status(201).json({ account });
  } catch (error) {
    next(error);
  }
};

module.exports.me = async (req, res) => {
  const user = await Account.findById(req.session.user._id).exec();
  res.status(200).json(user);
};

module.exports.logout = async (req, res, next) => {
  try {
    await Account.findOneAndUpdate(
      { _id: req.session.user._id },
      { token: null }
    ).exec();
    await req.session.destroy();
    res
      .clearCookie("dutyappsid", {
        domain: "btdutyapp.herokuapp.com",
        secure: process.env.NODE_ENV === "production",
        domain: "btdutyapp.herokuapp.com",
        httpOnly: true
      })
      .status(200)
      .json({ message: "Successfully logged out." });
  } catch (error) {
    next(error);
  }
};

module.exports.isAuthenticated = (req, res, next) => {
  let isAuthenticated = false;
  if (req.session && req.session.user) {
    isAuthenticated = true;
  }

  res.status(200).json({ isAuthenticated });
};
