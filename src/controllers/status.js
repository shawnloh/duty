const status = require('../models/status');

module.exports.getAll = async (req, res) => {
  console.log(req.header('Authorization'));
  try {
    const statuses = await status.find({}).sort({createdAt: -1});
    res.json(statuses);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports.create = async (req, res) => {
  try {
    if (!req.body.name || req.body.name.trim() == '') {
      return res.status(400).json({message: 'Status name is required'});
    }
    await status.init();

    const newstatus = new status({name: req.body.name.trim()});
    newstatus.save().then(() => {
      res.status(201).json({message: 'Successfully created status'});
    }).catch((err) => {
      res.status(400).json({message: 'Duplicated status'});
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports.delete = async (req, res) => {
  try {
    if (!req.params.statusId) {
      return res.status(400).json({message: 'Invalid id'});
    }
    const deletedStatus = await status.findByIdAndRemove(req.params.statusId);
    if (!deletedStatus) {
      return res.status(400).json({message: 'Invalid id'});
    }
    res.status(200).json({deletedStatus, deleted: true});
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports.update = async (req, res) => {
  try {
    if (!req.params.statusId) {
      return res.status(400).json({message: 'Invalid id'});
    }
    if (!req.body.name) {
      return res
          .status(400)
          .json({message: 'Name is required for updating current status'});
    }
    const updatedStatus = await status
        .findByIdAndUpdate(req.params.statusId,
            {name: req.body.name},
            {new: true});
    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
