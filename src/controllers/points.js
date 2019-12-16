const Point = require('../models/point');

module.exports.viewAll = async (req, res, next) => {
  try {
    const points = await Point.find({})
        .populate('statusNotAllowed')
        .populate('Group')
        .exec();
    res.status(200).json(points);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res) => {
  const newPointsSystem = {
    name: req.body.name,
    group: req.body.group,
    statusNotAllowed: [],
    onlyStatus: false,
  };
  res.send('in progress');
};
