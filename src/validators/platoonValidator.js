const platoon = require('../models/platoon');

module.exports.exist = (_id) => {
  return platoon.findById(_id).exec();
};
