const Group = require('../models/group');
const platoonValidator = require('../validators/platoonValidator');
const rankValidator = require('../validators/rankValidator');

module.exports.viewAll = async (req, res, next) => {
  try {
    const groups = await Group.find({})
        .populate('platoons', 'name _id')
        .populate('ranks', 'name _id')
        .exec();
    res.json(groups);
  } catch (err) {
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    // checks if platoon exist in db
    const platoonExist = await platoonValidator.existAll(req.body.platoons);
    if (!platoonExist) {
      return res.status(400)
          .json({errors: ['Please check your platoons array ids']});
    }
    const rankExist = await rankValidator.existAll(req.body.ranks);
    if (!rankExist) {
      return res.status(400)
          .json({errors: ['Please check your ranks array ids']});
    }
    const newGroup = {
      name: req.body.name,
      platoons: req.body.platoons,
      ranks: req.body.ranks,
    };
    let createdGroup = await Group.create(newGroup);
    createdGroup = await createdGroup
        .populate('platoons', 'name _id')
        .populate('ranks', 'name _id')
        .execPopulate();
    res.status(201).json(createdGroup);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const foundGroup = await Group.findById(req.params.groupId).exec();
    if (!foundGroup) {
      return res.status(400).json({errors: [
        'Please check if your group id is valid',
      ]});
    }
    if (req.body.name && req.body.name.trim().length > 0) {
      foundGroup.name = req.body.name;
    }

    if (req.body.platoons && req.body.platoons.length > 0) {
      const platoonExist = await platoonValidator.existAll(req.body.platoons);
      if (!platoonExist) {
        return res.status(400)
            .json({errors: ['Please check your platoons array ids']});
      }
      foundGroup.platoons = req.body.platoons;
    }

    if (req.body.ranks && req.body.ranks.length > 0) {
      const rankExist = await rankValidator.existAll(req.body.ranks);

      if (!rankExist) {
        return res.status(400)
            .json({errors: ['Please check your ranks array ids']});
      }
      foundGroup.ranks = req.body.ranks;
    }

    let savedGroup = await foundGroup.save({validateBeforeSave: true});
    savedGroup = await savedGroup
        .populate('platoons', 'name _id')
        .populate('ranks', 'name _id')
        .execPopulate();
    res.status(200).json(savedGroup);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const deleted = await Group.findByIdAndRemove(req.params.groupId).exec();
    res.status(200).json({id: deleted._id, deleted: true});
  } catch (error) {
    next(error);
  }
};
