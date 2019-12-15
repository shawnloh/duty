const {validationResult} = require('express-validator');
const Promise = require('bluebird');
const moment = require('moment-timezone');
const person = require('../models/person');
const personnelStatus = require('../models/personnelStatus');
// const personnelPoint = require('../models/personnelPoint');


module.exports.viewAll = async (req, res) => {
  const persons = await person.find({})
      // .populate('points')
      .populate('personnelStatus')
      .exec();
  res.status(200).json(persons);
};
module.exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array({onlyFirstError: true}),
      });
    }
    const createdPerson = await person.create(req.body);
    res.status(201).json(createdPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports.addStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array({onlyFirstError: true}),
      });
    }

    const currentPerson = req.person;
    const newPersonnelStatus = {
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
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports.deleteStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array({onlyFirstError: true}),
      });
    }

    const removePersonnelStatus = personnelStatus
        .findByIdAndRemove(req.params.personnelStatusId);
    const currentPerson = req.person;
    currentPerson.personnelStatus.pull(req.params.personnelStatusId);

    await Promise.all([removePersonnelStatus.exec(), currentPerson.save()]);

    res.status(200).json(currentPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports.updateStatus = async (req, res) => {
  try {
    const currStatus = req.personnelStatus;
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

    await currStatus.save({validateBeforeSave: true});
    res.status(200).json(currStatus);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
