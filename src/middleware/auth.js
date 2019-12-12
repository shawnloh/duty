const jwt = require('jsonwebtoken');
const Account = require('../models/account');

// auth checks for user that contains a valid token
const auth = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(400).send({error: 'Invalid token'});
  }

  if (req.header('Authorization').indexOf('Bearer') == -1) {
    return res.status(400).send({error: 'Invalid token'});
  }

  const token = req.header('Authorization').replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_KEY, {}, async (err, data) => {
    try {
      if (err) {
        return res.status(400).send({error: 'Invalid token'});
      }
      const user = await Account.findOne({
        _id: data._id,
        token: token,
      });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.status(401).send({error: 'Not authorized to access this resource'});
    }
  });
};

module.exports = auth;
