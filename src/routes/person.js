const {Router} = require('express');
const {body, param} = require('express-validator');
const moment = require('moment');
const expressValidation = require('../middleware/expressValidation');
const errorHandler = require('../middleware/errorHandler');
const auth = require('../middleware/auth');
const rankValidator = require('../validators/rankValidator');
const platoonValidator = require('../validators/platoonValidator');
const status = require('../models/status');
const personController = require('../controllers/person');

const errorMessages = {
  INVALID_START_DATE: 'Invalid start date, DD-MM-YYYY format only',
  INVALID_END_DATE: 'Invalid end date, DD-MM-YYYY format only',
  INVALID_STATUS_ID: 'Invalid status id',
  INVALID_RANK_ID: 'Invalid rank id',
  INVALID_PLATOON_ID: 'Invalid platoon id',
  INVALID_PERSON_ID: 'Invalid person id',
  INVALID_PSTATUS_ID: 'Invalid personnel status id',
  INVALID_PPOINT_ID: 'Invalid personnel point id',
};

const router = Router();


router.use(auth);

router.get('/', personController.viewAll);
router.post('/new', [
  body('rank')
      .isMongoId()
      .withMessage('Please provide a valid rank id')
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
      .withMessage('Please provide a valid platoon id')
      .notEmpty()
      .withMessage('Platoon is required to create new person')
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
router.put('/:personId', [
  param('personId')
      .isMongoId()
      .withMessage(errorMessages.INVALID_PERSON_ID),
  body('rank')
      .if((rank, {req}) => req.body.rank)
      .isMongoId()
      .withMessage('Please provide a valid rank id')
      .custom(async (rankId) => {
        const rank = await rankValidator.exist(rankId);
        if (!rank) {
          throw new Error(errorMessages.INVALID_RANK_ID);
        }
      }),
  body('platoon')
      .if((platoon, {req}) => req.body.platoon)
      .isMongoId()
      .withMessage('Please provide a valid platoon id')
      .custom(async (platoonId) => {
        const platoon = await platoonValidator.exist(platoonId);
        if (!platoon) {
          throw new Error(errorMessages.INVALID_PLATOON_ID);
        }
      }),
  body('name')
      .if((name, {req}) => req.body.name === '')
      .notEmpty()
      .withMessage('Name must not be empty'),
  expressValidation,
], personController.update);

router.delete('/:personId', [
  param('personId')
      .isMongoId()
      .withMessage(errorMessages.INVALID_PERSON_ID),
  expressValidation,
], personController.delete);

// Personnel Status Routes
router.post('/status/:personId/add', [
  param('personId')
      .isMongoId()
      .withMessage(errorMessages.INVALID_PERSON_ID),
  body('statusId')
      .notEmpty()
      .withMessage('Status id is required')
      .isMongoId()
      .withMessage(errorMessages.INVALID_STATUS_ID)
      .custom(async (statusId) => {
        const foundStatus = await status.findById(statusId).exec();
        if (!foundStatus) {
          return Promise.reject(
              new Error(errorMessages.INVALID_STATUS_ID),
          );
        }
      }),
  body('startDate')
      .notEmpty()
      .withMessage('Start date is required')
      .custom((startDate) => {
        if (!moment(startDate, 'DD-MM-YYYY', true).isValid()) {
          throw new Error(errorMessages.INVALID_START_DATE);
        }
        return true;
      }),
  body('endDate')
      .notEmpty()
      .withMessage('End date is required')
      .custom((endDate) => {
        if (!moment(endDate, 'DD-MM-YYYY', true).isValid()) {
          throw new Error(errorMessages.INVALID_END_DATE);
        }
        return true;
      }),
  expressValidation,
], personController.addStatus);

router.route('/status/:personId/:personnelStatusId')
    .all([
      param('personnelStatusId')
          .isMongoId()
          .withMessage(errorMessages.INVALID_PSTATUS_ID),
      param('personId')
          .isMongoId()
          .withMessage(errorMessages.INVALID_PERSON_ID),
      body('startDate')
          .if((value, {req}) => req.method === 'PUT')
          .if(body('startDate').exists())
          .notEmpty()
          .withMessage('Start date must not be empty')
          .custom((startDate) => {
            if (!moment(startDate, 'DD-MM-YYYY', true).isValid()) {
              throw new Error(errorMessages.INVALID_START_DATE);
            }
            return true;
          }),
      body('endDate')
          .if((value, {req}) => {
            return req.method === 'PUT';
          })
          .if(body('endDate').exists())
          .notEmpty()
          .withMessage('End date must not be empty')
          .custom((endDate) => {
            if (!moment(endDate, 'DD-MM-YYYY', true).isValid()) {
              throw new Error(errorMessages.INVALID_END_DATE);
            }
            return true;
          }),
      expressValidation,
    ])
    .delete(personController.deleteStatus)
    .put(personController.updateStatus);

router.route('/point/:personId/:personnelPointId')
    .all([
      param('personnelPointId')
          .isMongoId()
          .withMessage('Please provide a valid personnel point id'),
      param('personId')
          .isMongoId()
          .withMessage('Please provide a valid person id'),
      body('points')
          .notEmpty()
          .withMessage('Please provide a points to update personnel')
          .isNumeric({no_symbols: true})
          .withMessage('Please provide only numeric number for point'),
      expressValidation,
    ])
    .put(personController.updatePoint);

router.use(errorHandler.NOT_IMPLEMENTED);
router.use(errorHandler.API);

module.exports = router;
