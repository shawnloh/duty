const Platoon = require("../models/platoon");
// const platoonValidator = require("../validators/platoonValidator");

module.exports.viewAll = async (req, res, next) => {
  try {
    const platoons = await Platoon.find({})
      .lean()
      .select("_id name")
      .exec();
    res.status(200).json(platoons);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const newplatoon = await Platoon.create({ name: req.body.name });
    res.json(newplatoon);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    // let platoon = await platoonValidator.exist(req.params.platoonId);
    let platoon = await Platoon.findById(req.params.platoonId).exec();
    if (!platoon) {
      return res
        .status(400)
        .json({ errors: ["Please provide a valid platoon id"] });
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
    const deletedplatoon = await Platoon.findByIdAndDelete(
      req.params.platoonId
    ).exec();
    if (!deletedplatoon) {
      return res
        .status(400)
        .json({ errors: ["Please provide a valid platoon id"] });
    }
    res.status(200).json({ success: true, deletedplatoon });
  } catch (error) {
    next(err);
  }
};
