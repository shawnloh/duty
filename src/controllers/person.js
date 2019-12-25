const moment = require('moment-timezone');
const Promise = require('bluebird');
const Person = require('../models/person');
const Point = require('../models/point');
const PersonnelStatus = require('../models/personnelStatus');
const PersonnelPoint = require('../models/personnelPoint');


module.exports.viewAll = async (req, res, next) => {
  try {
    const persons = await Person.find({})
        // .populate('points', '-personId -__v -createdAt -updatedAt')
        .populate({
          path: 'points',
          select: '-personId -__v -createdAt -updatedAt',
          populate: {
            path: 'pointSystem',
            model: 'Point',
            select: '_id name',
          },
        })
        // .populate('statuses', '-personId -__v -createdAt -updatedAt')
        .populate({
          path: 'statuses',
          select: '-personId -__v -createdAt -updatedAt',
          populate: {
            path: 'statusId',
            model: 'Status',
            select: '_id name',
          },
        })
        .populate('rank', '-createdAt -updatedAt -__v')
        .populate('platoon', '-createdAt -updatedAt -__v')
        .select('-__v -createdAt -updatedAt')
        .exec();
    res.status(200).json(persons);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    // const createdPerson = await person.create(req.body);
    let createdPerson = await new Person(req.body).save();
    const points = await Point.find({}).exec();
    await Promise.all(points.map((point) => {
      const newPersonnelPoint = {
        personId: createdPerson._id,
        pointSystem: point._id,
        points: 0,
      };
      const createNewPersonnelPoint = new PersonnelPoint(newPersonnelPoint);
      return createNewPersonnelPoint.save();
    }));

    createdPerson = await Person.findById(createdPerson._id)
        .populate({
          path: 'points',
          select: '-personId -__v -createdAt -updatedAt',
          populate: {
            path: 'pointSystem',
            model: 'Point',
            select: '_id name',
          },
        })
        // .populate('statuses', '-personId -__v -createdAt -updatedAt')
        .populate({
          path: 'statuses',
          select: '-personId -__v -createdAt -updatedAt',
          populate: {
            path: 'statusId',
            model: 'Status',
            select: '_id name',
          },
        })
        .populate('rank', '-createdAt -updatedAt -__v')
        .populate('platoon', '-createdAt -updatedAt -__v')
        .select('-__v -createdAt -updatedAt');

    res.status(201).json(createdPerson);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const errors = [];
    let modified = false;
    let person = await Person.findById(req.params.personId).exec();
    if (!person) {
      errors.push('Invalid person id');
      return res.status(400).json({errors});
    }

    if (req.body.rank && !person.rank.equals(req.body.rank)) {
      person.rank = req.body.rank;
      modified = true;
    }
    if (req.body.platoon && !person.platoon.equals(req.body.platoon)) {
      person.platoon = req.body.platoon;
      modified = true;
    }
    if (req.body.name && person.name !== req.body.name) {
      person.name = req.body.name;
      modified = true;
    }
    if (!modified) {
      return res.status(304).json();
    }

    person = await person.save();
    const opts = [
      {
        path: 'points',
        select: '-personId -__v -createdAt -updatedAt',
        populate: {
          path: 'pointSystem',
          model: 'Point',
          select: '_id name',
        },
      },
      {
        path: 'statuses',
        select: '-personId -__v -createdAt -updatedAt',
        populate: {
          path: 'statusId',
          model: 'Status',
          select: '_id name',
        },
      },
      {
        path: 'rank',
        select: '-createdAt -updatedAt -__v',
      },
      {
        path: 'platoon',
        select: '-createdAt -updatedAt -__v',
      },
    ];
    person = await Person.populate(person, opts);

    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
};
/**
 * Personnel Status Route
 */

module.exports.addStatus = async (req, res, next) => {
  try {
    const newPersonnelStatus = {
      personId: req.params.personId,
      statusId: req.body.statusId,
      startDate: moment(req.body.startDate, 'DD-MM-YYYY')
          .format('DD-MM-YYYY'),
      endDate: moment(req.body.endDate, 'DD-MM-YYYY')
          .format('DD-MM-YYYY'),
    };
    let createdPStatus = new PersonnelStatus(newPersonnelStatus);
    createdPStatus = await createdPStatus.save({validateBeforeSave: true});
    res.status(201).json(createdPStatus);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteStatus = async (req, res, next) => {
  try {
    const errors = [];
    const pStatus = await PersonnelStatus
        .findById(req.params.personnelStatusId)
        .exec();

    if (!pStatus) {
      errors.push('Invalid personnel status id');
      return res.status(400).json(errors);
    }
    await pStatus.remove();
    res.status(200).json({success: true, pStatus});
  } catch (error) {
    next(error);
  }
};

module.exports.updateStatus = async (req, res, next) => {
  try {
    const errors= [];
    const currStatus = await PersonnelStatus
        .findOne({_id: req.params.personnelStatusId})
        .exec();
    if (!currStatus) {
      errors.push('Invalid personnel status id');
      return res.status(400).json(errors);
    }
    if (req.body.startDate) {
      currStatus.startDate = req.body.startDate;
    }
    if (req.body.endDate) {
      currStatus.endDate = req.body.endDate;
    }

    await currStatus.save({validateBeforeSave: true});
    res.status(200).json(currStatus);
  } catch (error) {
    next(error);
  }
};

/**
 * Personnel Point Route
 */

module.exports.updatePoint = async (req, res, next) => {
  const {personId, personnelPointId} = req.params;
  const {points} = req.body;
  const errors = [];
  let [person, personnelPoint] = await Promise.all([
    Person.findById(personId).exec(),
    PersonnelPoint.findById(personnelPointId).exec(),
  ]);
  if (!person) {
    errors.push('Person id is not valid');
    return res.status(400).json({errors});
  }
  if (!personnelPoint) {
    errors.push('Personnel point id is not valid');
    return res.status(400).json({errors});
  }
  if (!personnelPoint.personId.equals(person._id)) {
    errors.push('Invalid request');
    return res.status(400).json({errors});
  }
  if (points === personnelPoint.points) {
    return res.status(304).json();
  }
  personnelPoint.points = points;
  personnelPoint = await personnelPoint.save();
  res.status(200).json({success: true, personnelPoint});
};
