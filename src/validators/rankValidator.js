const rank = require('../models/rank');

module.exports.exist = async (_id) => {
  return rank.findById(_id).exec();
};
