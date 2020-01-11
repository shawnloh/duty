const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return msg;
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }
  next();
};
