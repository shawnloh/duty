const Promise = require('bluebird');
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
    const currentPerson = req.person;
    const newPersonnelStatus = {
      personId: req.params.personId,
      statusId: req.body.statusId,
      startDate: moment(req.body.startDate, 'DD-MM-YYYY')
          .format('DD-MM-YYYY'),
      endDate: moment(req.body.endDate, 'DD-MM-YYYY')
          .format('DD-MM-YYYY'),
    };
    const createdPStatus = await personnelStatus.create(newPersonnelStatus);
    if (!createdPStatus) {
      return res.status(400).json({errors: [{
        msg: 'unable to create personnel status',
      }]});
    }

    currentPerson.personnelStatus.push(createdPStatus);
    await currentPerson.save();
    res.status(201).json(currentPerson);
  } catch (error) {
    next(err);
  }
};

module.exports.deleteStatus = async (req, res, next) => {
  try {
    const removePersonnelStatus = personnelStatus
        .findByIdAndRemove(req.params.personnelStatusId);
    const currentPerson = req.person;
    currentPerson.personnelStatus.pull(req.params.personnelStatusId);
    await Promise.all([removePersonnelStatus.exec(), currentPerson.save()]);
    res.status(200).json(currentPerson);
  } catch (error) {
    next(err);
  }
};

module.exports.updateStatus = async (req, res, next) => {
  try {
    let currStatus = req.personnelStatus;
    if (req.body.startDate) {
      // currStatus.startDate = moment(req.body.startDate, 'DD-MM-YYYY')
      // .format('DD-MM-YYYY');
      currStatus.startDate = req.body.startDate;
    }
    if (req.body.endDate) {
      // currStatus.endDate = moment(req.body.endDate, 'DD-MM-YYYY')
      // .format('DD-MM-YYYY');
      currStatus.endDate = req.body.endDate;
    }

    currStatus = await personnelStatus.findByIdAndUpdate(currStatus._id)
        .populate('statusId')
        .exec();
    // await currStatus.save({validateBeforeSave: true});
    res.status(200).json(currStatus);
  } catch (error) {
    next(err);
  }
};
