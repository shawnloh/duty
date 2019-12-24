const status = require('../models/status');

module.exports.getAll = async (req, res, next) => {
  try {
    const statuses = await status.find({}).sort({createdAt: -1});
    res.json(statuses);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    let newStatus = new status({name: req.body.name.trim()});
    newStatus = await newStatus.save();
    res.status(201).json({newStatus});
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const deletedStatus = await status.findById(req.params.statusId).exec();
    if (!deletedStatus) {
      return res.status(400).json({errors: [
        'Please provide a valid status id',
      ]});
    }
    await deletedStatus.remove();
    res.status(200).json({deletedStatus, success: true});
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const updatedStatus = await status
        .findByIdAndUpdate(req.params.statusId,
            {name: req.body.name},
            {new: true});
    res.status(200).json(updatedStatus);
  } catch (error) {
    next(error);
  }
};
