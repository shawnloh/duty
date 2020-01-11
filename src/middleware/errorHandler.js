const mongoose = require("mongoose");

module.exports.API = (err, req, res, next) => {
  console.error(err.stack);
  console.error(err);
  if (err.name === "MongoError" && err.code === 11000) {
    return res.status(422).send({
      success: false,
      message: "Duplication detected, please check your input"
    });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = [];
    Object.keys(err.errors).forEach(fieldName => {
      errors.push(err.errors[fieldName].message);
    });
    return res.status(422).json({ errors });
  }

  res.status(500).json({ message: "Internal Server Error" });
};

module.exports.NOT_IMPLEMENTED = (req, res) => {
  res.status(405).json({ message: "Method not allowed" });
};
