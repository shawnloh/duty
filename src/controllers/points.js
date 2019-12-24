const Point = require('../models/point');

module.exports.viewAll = async (req, res, next) => {
  try {
    const points = await Point.find({})
        .populate('statusNotAllowed')
        // .populate('group', '-createdAt -updatedAt -__v')
        .populate({
          path: 'group',
          select: '_id name',
          populate: [{
            path: 'ranks',
            model: 'Rank',
            select: '_id name',
          },
          {
            path: 'platoons',
            model: 'Platoon',
            select: '_id name',
          }],
        })
        .exec();
    res.status(200).json(points);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  const newPointsSystem = {
    name: req.body.name,
    group: req.body.group,
    statusNotAllowed: req.body.statusNotAllowed || [],
    onlyStatus: req.body.onlyStatus || false,
  };

  try {
    let createdPoint = await Point.create(newPointsSystem);
    createdPoint = await createdPoint
        .populate('statusNowAllowed')
        .populate({
          path: 'group',
          select: '_id name',
          populate: [{
            path: 'ranks',
            model: 'Rank',
            select: '_id name',
          },
          {
            path: 'platoons',
            model: 'Platoon',
            select: '_id name',
          }],
        })
        .execPopulate();
    res.status(201).send(createdPoint);
  } catch (error) {
    next(error);
  }
};
