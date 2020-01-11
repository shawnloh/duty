const mongoose = require("mongoose");
const platoon = require("../models/platoon");

module.exports.exist = async _id => {
  // return platoon.findById(_id).exec();
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return false;
  }

  return platoon.exists({ _id: _id });
};

module.exports.existAll = async _idArr => {
  let exist = true;
  for (let index = 0; index < _idArr.length; index++) {
    const id = _idArr[index];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      exist = false;
      break;
    }
    exist = await platoon.exists({ _id: id });
    if (!exist) {
      exist = false;
      break;
    }
  }

  return exist;
};
