const mongoose = require("mongoose");
const rank = require("../models/rank");

module.exports.exist = async _id => {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return false;
  }
  return rank.exists({ _id: _id });
};

module.exports.existAll = async _idArr => {
  let exist = true;
  for (let index = 0; index < _idArr.length; index++) {
    const id = _idArr[index];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      exist = false;
      break;
    }
    exist = await rank.exists({ _id: id });
    if (!exist) {
      exist = false;
      break;
    }
  }

  return exist;
};
