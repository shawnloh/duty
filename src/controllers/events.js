const EventRepository = require('../repository/events');
const PersonRepository = require('../repository/person');
// User view events
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
module.exports.getAll = async (req, res, next) => {
  try {
    const events = await EventRepository.findAll();
    res.status(200).json(events);
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
    const {date, pointSystemId, pointAllocation, personnels} = req.body;
    const name = req.body.name;

    const event = await EventRepository.create(
        name, date, pointSystemId, pointAllocation, personnels,
    );
    if (event === EventRepository.errors.INVALID_POINT_SYSTEM_OR_PERSON_ID) {
      errors.push('Invalid point system or personnel id');
      return res.status(400).json({errors});
    }
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};


module.exports.generate = async (req, res, next) => {
  try {
    const {date, platoons, ranks, pointSystemId} = req.body;
    const pioneers = req.body.pioneers || 0;
    const wspecs = req.body.wspecs || 0;
    const officers = req.body.officers || 0;
    let statusNotAllowed = [];
    let onlyStatus = false;
    const errors = [];

    if (req.body.statusNotAllowed && req.body.statusNotAllowed.length > 0) {
      statusNotAllowed = req.body.statusNotAllowed;
    }
    if (req.body.onlyStatus) {
      onlyStatus = req.body.onlyStatus;
    }

    if (onlyStatus && statusNotAllowed.length > 0) {
      errors.push(
          'onlyStatus can only be false when statusNotAllowed is provided',
      );
      return res.status(400).json({errors});
    }

    if (pioneers === 0 && wspecs === 0 && officers === 0) {
      errors.push(
          'There must be at least 1 quantity from pioneers / wspecs / officers',
      );
      return res.status(400).json({errors});
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
      oQty: officers,
    });

    res.status(200).json(persons);
  } catch (error) {
    next(error);
  }
};
