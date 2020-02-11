const EventRepository = require("../repository/events");
const PersonRepository = require("../repository/person");

// User view events
module.exports.getAll = async (req, res, next) => {
  try {
    const events = await EventRepository.findAll();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

module.exports.getOne = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await EventRepository.findById(eventId);
    const errors = [];
    if (event === EventRepository.errors.INVALID_EVENT_ID) {
      errors.push("Invalid events id");
      return res.status(400).json({ errors });
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// User create event and depending on the quantity of pioneers, specs and
// officers, automatically generate and allow user to reroll individual
// personnels. User can choose to enable point awarded to confirmed personnel
module.exports.create = async (req, res, next) => {
  try {
    const errors = [];
    const { date, pointSystemId, pointAllocation, personnels } = req.body;
    const name = req.body.name;

    const event = await EventRepository.create(
      name,
      date,
      pointSystemId,
      pointAllocation,
      personnels
    );

    if (event === EventRepository.errors.INVALID_POINT_SYSTEM_OR_PERSON_ID) {
      errors.push("Invalid point system or personnel id");
      return res.status(400).json({ errors });
    }

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// Generate a list of names given qty and
// date and status not allowed / status only
module.exports.generate = async (req, res, next) => {
  try {
    const {
      date,
      platoons,
      ranks,
      pointSystemId,
      pioneers = 0,
      wspecs = 0,
      officers = 0,
      statusNotAllowed = [],
      onlyStatus = false
    } = req.body;

    const errors = [];

    if (onlyStatus && statusNotAllowed.length > 0) {
      errors.push(
        "onlyStatus can only be false when statusNotAllowed is provided"
      );
      return res.status(400).json({ errors });
    }

    if (pioneers === 0 && wspecs === 0 && officers === 0) {
      errors.push(
        "There must be at least 1 quantity from pioneers / wspecs / officers"
      );
      return res.status(400).json({ errors });
    }

    const persons = await PersonRepository.Generator.generate({
      date,
      platoons,
      ranks,
      statusNotAllowed,
      pointSystemId,
      onlyStatus,
      pQty: pioneers,
      wsQty: wspecs,
      oQty: officers
    });

    res.status(200).json(persons);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const revert = req.body.revert;
    let event;

    if (revert) {
      event = await EventRepository.revertAndDelete(eventId);
    } else {
      event = await EventRepository.delete(eventId);
    }

    const errors = [];
    if (event === EventRepository.errors.INVALID_EVENT_ID) {
      errors.push("Invalid event id");
      return res.status(400).json({ errors });
    }

    return res.status(200).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

module.exports.changePersonnels = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const newPersonnels = req.body.personnels;
    const event = await EventRepository.changePersonnels(
      eventId,
      newPersonnels
    );

    const errors = [];
    if (event === EventRepository.errors.INVALID_EVENT_ID) {
      errors.push("Invalid event id");
      return res.status(400).json({ errors });
    }

    if (event === EventRepository.errors.CONTAINS_INVALID_PERSON_ID) {
      errors.push("Contains invalid person id");
      return res.status(400).json({ errors });
    }

    return res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};
