const Status = require("../models/status");

module.exports.getAll = async (req, res, next) => {
  try {
    const statuses = await Status.find({})
      .lean()
      .sort({ createdAt: -1 })
      .select("_id name")
      .exec();
    res.json(statuses);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    let newStatus = new Status({ name: req.body.name.trim() });
    newStatus = await newStatus.save();
    res.status(201).json(newStatus);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const deletedStatus = await Status.findById(req.params.statusId).exec();
    if (!deletedStatus) {
      return res
        .status(400)
        .json({ errors: ["Please provide a valid status id"] });
    }
    await deletedStatus.remove();
    res.status(200).json({ deletedStatus, success: true });
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const updatedStatus = await Status.findByIdAndUpdate(
      req.params.statusId,
      { name: req.body.name },
      { new: true }
    );
    res.status(200).json(updatedStatus);
  } catch (error) {
    next(error);
  }
};
