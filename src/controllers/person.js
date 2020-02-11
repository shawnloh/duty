const moment = require("moment-timezone");
const PersonRepository = require("../repository/person");

module.exports.viewAll = async (req, res, next) => {
  try {
    const persons = await PersonRepository.findAll();
    res.status(200).json(persons);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const newPerson = await PersonRepository.create(req.body);
    res.status(201).json(newPerson);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const errors = [];
    const person = await PersonRepository.update(
      req.params.personId,
      req.body.name,
      req.body.rank,
      req.body.platoon
    );

    if (person === PersonRepository.errors.NO_SUCH_PERSON) {
      errors.push("Invalid person id");
      return res.status(400).json({ errors });
    }

    if (!person) {
      return res.status(304).json();
    }

    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const person = await PersonRepository.delete(req.params.personId);
    const errors = [];
    if (person === PersonRepository.errors.NO_SUCH_PERSON) {
      errors.push("Invalid person id");
      return res.status(400).json({ errors });
    }

    return res.status(200).json({ success: true, person: person._id });
  } catch (error) {
    next(error);
  }
};
/**
 * Personnel Status Route
 */

module.exports.addStatus = async (req, res, next) => {
  try {
    const errors = [];
    const person = PersonRepository.findById(req.params.personId);
    if (person === PersonRepository.errors.NO_SUCH_PERSON) {
      errors.push("Invalid person id");
      return res.status(400).json({ errors });
    }

    let newStatus = {
      personId: req.params.personId,
      statusId: req.body.statusId,
      startDate: moment(req.body.startDate, "DD-MM-YYYY").format("DD-MM-YYYY"),
      endDate:
        req.body.endDate !== "PERMANENT"
          ? moment(req.body.endDate, "DD-MM-YYYY").format("DD-MM-YYYY")
          : "PERMANENT"
    };
    newStatus = await PersonRepository.addStatus(newStatus);
    res.status(201).json(newStatus);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteStatus = async (req, res, next) => {
  try {
    const errors = [];
    const pStatus = await PersonRepository.deleteStatus(
      req.params.personId,
      req.params.personnelStatusId
    );

    switch (pStatus) {
      case PersonRepository.errors.NO_SUCH_PERSON:
        errors.push("Invalid person id");
        return res.status(400).json({ errors });
      case PersonRepository.errors.NO_SUCH_STATUS:
        errors.push("Invalid personnel status id");
        return res.status(400).json({ errors });
      case PersonRepository.errors.BAD_REQUEST:
        errors.push("Please double check status and person id");
        return res.status(400).json({ errors });
      default:
        res.status(200).json({ success: true, personnelStatus: pStatus });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateStatus = async (req, res, next) => {
  try {
    const errors = [];
    if (!req.body.startDate && !req.body.endDate) {
      return res.status(304).json();
    }
    const pStatus = await PersonRepository.updateStatus(
      req.params.personId,
      req.params.personnelStatusId,
      req.body
    );
    switch (pStatus) {
      case PersonRepository.errors.NOT_MODIFIED:
        return res.status(304).json();
      case PersonRepository.errors.NO_SUCH_STATUS:
      case PersonRepository.errors.BAD_REQUEST:
        errors.push("Please double check personnel status and person id");
        return res.status(400).json({ errors });
      default:
        res.status(200).json({ success: true, personnelStatus: pStatus });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Personnel Point Route
 */

module.exports.updatePoint = async (req, res, next) => {
  try {
    const { personId, personnelPointId } = req.params;
    const { points } = req.body;
    const errors = [];
    const pPoint = await PersonRepository.updatePoint(
      personId,
      personnelPointId,
      points
    );
    if (pPoint === PersonRepository.errors.NO_SUCH_POINT) {
      errors.push("Please double check your person and personnel point id");
      return res.status(400).json({ errors });
    }
    if (pPoint === PersonRepository.errors.NOT_MODIFIED) {
      return res.status(304).json();
    }
    res.status(200).json({ success: true, personnelPoint: pPoint });
  } catch (error) {
    next(error);
  }
};

/**
 * Blockout dates Route
 */

module.exports.addBlockDates = async (req, res, next) => {
  try {
    const person = await PersonRepository.addBlockout(
      req.params.personId,
      req.body.startDate,
      req.body.endDate
    );
    const errors = [];

    if (person === PersonRepository.errors.NO_SUCH_PERSON) {
      errors.push("Please provide a valid person id");
      return res.status(400).json({ errors });
    }
    if (person === PersonRepository.errors.NOT_MODIFIED) {
      return res.status(304).json();
    }
    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
};

module.exports.removeBlockoutDate = async (req, res, next) => {
  try {
    const errors = [];
    const { personId } = req.params;
    const { startDate, endDate = null } = req.body;
    const person = await PersonRepository.removeBlockout(
      personId,
      startDate,
      endDate
    );
    if (person === PersonRepository.errors.NO_SUCH_PERSON) {
      errors.push("Please provide a valid person id");
      return res.status(400).json({ errors });
    }
    if (person === PersonRepository.errors.NOT_MODIFIED) {
      return res.status(304).json();
    }
    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
};
