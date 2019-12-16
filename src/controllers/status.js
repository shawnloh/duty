const status = require('../models/status');

module.exports.getAll = async (req, res, next) => {
  try {
    const statuses = await status.find({}).sort({createdAt: -1});
    res.json(statuses);
  } catch (error) {
    next(error);
  }
};

module.exports.create = (req, res, next) => {
  const newstatus = new status({name: req.body.name.trim()});
  newstatus.save().then(() => {
    res.status(201).json({message: 'Successfully created status'});
  }).catch((err) => {
    if (err.errmsg && err.errmsg.indexOf('duplicate key') != -1) {
      return res.status(400).json({message: 'Duplicated status'});
    }
    next(err);
  });
};

module.exports.delete = async (req, res, next) => {
  try {
    const deletedStatus = await status.findByIdAndRemove(req.params.statusId);
    if (!deletedStatus) {
      return res.status(400).json({errors: [
        'Please provide a valid status id',
      ]});
    }
    res.status(200).json({deletedStatus, deleted: true});
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
