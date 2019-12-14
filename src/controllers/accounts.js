const Account = require('../models/account');
const validator = require('../validators/accountValidator');


module.exports.login = async (req, res) => {
  // Login a registered user
  try {
    validator.loginCredentials(req.body.username, req.body.password);
    const {username, password} = req.body;
    const user = await Account.findByCredentials(username, password);
    if (!user) {
      return res
          .status(401)
          .send({error: 'Login failed! Check authentication credentials'});
    }
    const token = await user.generateAuthToken();
    res.send({token});
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports.register = async (req, res) => {
  try {
    console.log(req.user);
    if (req.user.role != 'admin') {
      throw new Error('You need to be admin to use register an account');
    }
    validator.registerCredentials(req.body.username, req.body.password);
    const account = new Account(req.body);
    await account.save();
    const token = await account.generateAuthToken();
    res.status(201).send({account, token});
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports.me = (req, res) => {
  res.send(req.user);
};

module.exports.logout = async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send({message: 'internal server error'});
  }
};

