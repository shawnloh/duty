const Account = require('../models/account');


module.exports.login = async (req, res, next) => {
  // Login a registered user
  try {
    const {username, password} = req.body;
    if (!username || !password) {
      return res
          .status(401)
          .json({errors: ['Login failed! Check authentication credentials']});
    }

    const user = await Account.findByCredentials(username, password);
    if (!user) {
      return res
          .status(401)
          .json({errors: ['Login failed! Check authentication credentials']});
    }

    const token = await user.generateAuthToken();
    res.status(200).json({token});
  } catch (error) {
    next(error);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    if (req.user.role != 'admin') {
      return res
          .status(401)
          .json({errors: ['You need to be admin to register an account']});
    }
    const account = new Account(req.body);
    await account.save();
    const token = await account.generateAuthToken();
    res.status(201).send({account, token});
  } catch (error) {
    next(error);
  }
};

module.exports.me = (req, res) => {
  res.send(req.user);
};

module.exports.logout = async (req, res, next) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.send();
  } catch (error) {
    next(error);
  }
};

