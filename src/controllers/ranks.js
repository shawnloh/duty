const Rank = require("../models/rank");
// const rankValidator = require("../validators/rankValidator");

module.exports.viewAll = async (req, res, next) => {
  try {
    const ranks = await Rank.find({})
      .lean()
      .select("_id name")
      .exec();
    res.status(200).json(ranks);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const newRank = await Rank.create({ name: req.body.name });
    res.json(newRank);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    // let rank = await rank.findByID().exist(req.params.rankId);
    let rank = await Rank.findById(req.params.rankId);
    if (!rank) {
      return res.status(400).json({ errors: ["Please provide a valid id"] });
    }
    if (rank.name === req.body.name) {
      return res.status(304).json();
    }
    rank.name = req.body.name;
    rank = await rank.save();
    res.status(200).json(rank);
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const deletedRank = await Rank.findByIdAndDelete(req.params.rankId).exec();
    if (!deletedRank) {
      return res.status(400).json({ errors: ["Please provide a valid id"] });
    }
    res.status(200).json({ success: true, deletedRank });
  } catch (error) {
    next(err);
  }
};
