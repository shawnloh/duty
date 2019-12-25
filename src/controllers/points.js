const Promise = require('bluebird');
const Point = require('../models/point');
const Person = require('../models/person');
const personnelPoint = require('../models/personnelPoint');

module.exports.viewAll = async (req, res, next) => {
  try {
    const points = await Point.find({}).exec();
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
    const createdPoint = await new Point(newPointsSystem).save();
    const allPerson = await Person.find({});
    await Promise.all(allPerson.map(async (person) => {
      const newPPoint = {
        personId: person._id,
        pointSystem: createdPoint._id,
        points: 0,
      };
      const createdPersonnelPoint = new personnelPoint(newPPoint);
      await createdPersonnelPoint.save();
    }));

    res.status(201).send(createdPoint);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let pointSystem = await Point.findById(req.params.pointsId).exec();
    if (!pointSystem) {
      return res.status(400).json({errors: ['Invalid point system id']});
    }
    if (req.body.name === pointSystem.name) {
      return res.status(304);
    }

    pointSystem.name = req.body.name;
    pointSystem = await pointSystem.save();
    return res.status(200).json({
      success: true,
      pointSystem,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    let pointSystem = await Point.findById(req.params.pointsId).exec();
    if (!pointSystem) {
      return res.status(400).json({errors: ['Invalid point system id']});
    }
    pointSystem = await pointSystem.remove();
    return res.status(200).json({
      success: true,
      pointSystem,
    });
  } catch (error) {
    next(error);
  }
};
