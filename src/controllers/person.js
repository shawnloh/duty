const moment = require('moment-timezone');
const person = require('../models/person');
const personnelStatus = require('../models/personnelStatus');
// const personnelPoint = require('../models/personnelPoint');


module.exports.viewAll = async (req, res, next) => {
  try {
    const persons = await person.find({})
    // .populate('points')
        .populate('personnelStatus', '-statusId -personId -__v')
        .populate('rank')
        .populate('platoon')
        .select('-__v')
        .exec();
    res.status(200).json(persons);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const createdPerson = await person.create(req.body);
    res.status(201).json(createdPerson);
  } catch (error) {
    next(error);
  }
};

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
    let createdPStatus = new personnelStatus(newPersonnelStatus);
    createdPStatus = await createdPStatus.save({validateBeforeSave: true});
    res.status(201).json(createdPStatus);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteStatus = async (req, res, next) => {
  try {
    const errors = [];
    const pStatus = await personnelStatus
        .findById(req.params.personnelStatusId)
        .exec();

    if (!pStatus) {
      errors.push('Invalid personnel status id');
      return res.status(400).json(errors);
    }
    await pStatus.remove();
    res.status(200).json({deleted: true, pStatus});
  } catch (error) {
    next(error);
  }
};

module.exports.updateStatus = async (req, res, next) => {
  try {
    const errors= [];
    const currStatus = await personnelStatus
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
