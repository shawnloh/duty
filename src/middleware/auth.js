const jwt = require("jsonwebtoken");
const Account = require("../models/account");

const auth = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      throw new Error();
    }

    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_KEY);
    const user = await Account.findOne({
      _id: data._id,
      "tokens.token": token
    });
    if (!user) {
      throw new Error("No such user exists.");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
module.exports = auth;
