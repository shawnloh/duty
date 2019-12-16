const {Router} = require('express');
const {body, param} = require('express-validator');
const moment = require('moment');
const expressValidation = require('../middleware/expressValidation');
const errorHandler = require('../middleware/errorHandler');
const auth = require('../middleware/auth');
const rankValidator = require('../validators/rankValidator');
const platoonValidator = require('../validators/platoonValidator');
const person = require('../models/person');
const status = require('../models/status');
const personnelStatus = require('../models/personnelStatus');
const personController = require('../controllers/person');

const router = Router();


router.use(auth);

router.get('/', personController.viewAll);
router.post('/new', [
  body('rank')
      .isMongoId()
      .withMessage('Rank is required to create new person')
      .notEmpty()
      .withMessage('Rank is required to create new person')
      .custom(async (rankId) => {
        const rank = await rankValidator.exist(rankId);
        if (!rank) {
          throw new Error('Rank does not exist, please create one');
        }
      }),
  body('platoon')
      .isMongoId()
      .withMessage('Person must have a platoon assigned')
      .notEmpty()
      .withMessage('Person must have a platoon assigned')
      .custom(async (platoonId) => {
        const platoon = await platoonValidator.exist(platoonId);
        if (!platoon) {
          throw new Error('Platoon does not exist, please create one');
        }
      }),
  body('name')
      .isString()
      .withMessage('Person must have a name')
      .notEmpty()
      .withMessage('Person must have a name'),
  expressValidation,
], personController.create);

// Personnel Status Routes
router.post('/:personId/addstatus', [
  param('personId')
      .isMongoId()
      .custom(async (id, {req}) => {
        const foundPerson = await person.findById(id).exec();
        if (!foundPerson) {
          return Promise.reject(new Error('Invalid person id'));
        }
        req.person = foundPerson;
      }),
  body('statusId')
      .notEmpty()
      .withMessage('Status id is required')
      .isMongoId()
      .withMessage('Please provide a valid id')
      .custom(async (statusId) => {
        const foundStatus = await status.findById(statusId).exec();
        if (!foundStatus) {
          return Promise.reject(
              new Error('Invalid status id, make sure you add status first'),
          );
        }
      }),
  body('startDate').notEmpty()
      .withMessage('Start date is required')
      .custom((startDate) => {
        if (!moment(startDate, 'DD-MM-YYYY').isValid()) {
          throw new Error('Invalid start date, please use DD-MM-YYYY format');
        }
        return true;
      }),
  body('endDate').notEmpty()
      .withMessage('End date is required')
      .custom((endDate) => {
        if (!moment(endDate, 'DD-MM-YYYY').isValid()) {
          throw new Error('Invalid end date, please use DD-MM-YYYY format');
        }
        return true;
      }),
  expressValidation,
], personController.addStatus);

router.route('/:personId/:personnelStatusId')
    .all([
      param('personnelStatusId')
          .isMongoId()
          .withMessage('Please provide a valid personnel status id')
          .custom(async (personnelStatusId, {req}) => {
            const foundStatus = await personnelStatus
                .findById(personnelStatusId)
                .populate('statusId')
                .exec();
            if (!foundStatus) {
              return Promise.reject(
                  new Error(
                      'Invalid personnel status id',
                  ),
              );
            }
            req.personnelStatus = foundStatus;
          }),

    ])
    .delete(param('personId')
        .isMongoId()
        .custom(async (id, {req}) => {
          const foundPerson = await person.findById(id)
              .populate('personnelStatus')
              .exec();
          if (!foundPerson) {
            return Promise.reject(new Error('Invalid person id'));
          }
          req.person = foundPerson;
        }), expressValidation, personController.deleteStatus)
    .put(expressValidation, personController.updateStatus);

router.use(errorHandler.API);

module.exports = router;
