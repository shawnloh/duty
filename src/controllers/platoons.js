const platoon = require('../models/platoon');
const platoonValidator = require('../validators/platoonValidator');

module.exports.viewAll = async (req, res, next) => {
  try {
    const platoons = await platoon.find({}).exec();
    res.status(200).json(platoons);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const newplatoon = await platoon.create({name: req.body.name});
    res.json(newplatoon);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let platoon = await platoonValidator.exist(req.params.platoonId);
    if (!platoon) {
      return res.status(400).json({'errors': [
        'Please provide a valid platoon id',
      ]});
    }

    platoon.name = req.body.name;
    platoon = await platoon.save();
    res.status(200).json(platoon);
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const deletedplatoon = await platoon
        .findByIdAndDelete(req.params.platoonId)
        .exec();
    if (!deletedplatoon) {
      return res.status(400).json({'errors': [
        'Please provide a valid platoon id',
      ]});
    }
    res.status(200).json({success: true, deletedplatoon});
  } catch (error) {
    next(err);
  }
};
