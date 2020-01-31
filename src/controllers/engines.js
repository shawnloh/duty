const Promise = require("bluebird");
const BlockoutDateEngine = require("../engines/blockoutdates");
const StatusEngine = require("../engines/status");
const EventsEngine = require("../engines/events");
const EventDatesEngine = require("../engines/eventdates");

module.exports.purgeAll = async (req, res, next) => {
  try {
    await Promise.all([
      BlockoutDateEngine.purge(),
      StatusEngine.purge(),
      EventsEngine.purge(),
      EventDatesEngine.purge()
    ]);
    res.status(200).json({ message: "Successfully purge all" });
  } catch (error) {
    next(error);
  }
};

module.exports.purgeBlockout = async (req, res, next) => {
  try {
    await BlockoutDateEngine.purge();
    res.status(200).json({ message: "Successfully purge blockout" });
  } catch (error) {
    next(error);
  }
};

module.exports.purgeStatus = async (req, res, next) => {
  try {
    await StatusEngine.purge();
    res.status(200).json({ message: "Successfully purge status" });
  } catch (error) {
    next(error);
  }
};

module.exports.purgeEvents = async (req, res, next) => {
  try {
    await EventsEngine.purge();
    res.status(200).json({ message: "Successfully purge events" });
  } catch (error) {
    next(error);
  }
};

module.exports.purgeEventDates = async (req, res, next) => {
  try {
    await EventDatesEngine.purge();
    res.status(200).json({ message: "Successfully purge event dates" });
  } catch (error) {
    next(error);
  }
};
