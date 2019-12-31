const {Router} = require('express');
const {body, param} = require('express-validator');
const moment = require('moment-timezone');
const eventsController = require('../controllers/events');
const expressValidation = require('../middleware/expressValidation');
const errorHandler = require('../middleware/errorHandler');
const auth = require('../middleware/auth');
const {Types} = require('mongoose');

const errorMessages = {
  NUMERIC_VALUE_ONLY: 'must be numeric value only',
  BOOLEAN_VALUE_ONLY: 'must be true or false only',
  REQUIRED_QUANTITY:
  '1 quantity of either pioneers, wspecs, officers is required',
  PLATOON_REQUIRED: '1 quantity of platoon is required',
  RANK_REQUIRED: '1 quantity of rank is required',
  POINT_SYSTEM_REQUIRED: 'pointSystemId is required',
  INVALID_POINT_SYSTEM_ID: 'Invalid point system id',
  POINT_ALLOCATION_REQUIRED: 'pointAllocation is required',
  INVALID_POINT_ALLOCATION: 'pointAllocation must be only in number',
  PERSONNEL_REQUIRED: 'personnels must contain at least 1 valid person id',
  INVALID_PERSONNEL_ID: 'personnels contains 1 or more invalid person id',
  INVALID_NAME: 'name must not be empty if provided',
  STATUS_NOT_ALLOWED: 'statusNotAllowed must contain at least 1 status',
  DATE_REQUIRED: 'date must be required',
  DATE_FORMAT: 'date must be in DD-MM-YYYY format',
  INVALID_EVENT_ID: 'event id is invalid',
  numericOnly: function(title) {
    return `${title} ${this.NUMERIC_VALUE_ONLY}`;
  },
  booleanOnly: function(title) {
    return `${title} ${this.BOOLEAN_VALUE_ONLY}`;
  },
  invalidId: function(title) {
    return `${title} contains 1 or more invalid id`;
  },
};

const generatorValidator = () => {
  return [
    body('date')
        .exists()
        .withMessage(errorMessages.DATE_REQUIRED)
        .bail()
        .custom((value) => {
          if (!moment(value, 'DD-MM-YYYY', true).isValid()) {
            throw new Error(errorMessages.DATE_FORMAT);
          }
          return true;
        }),
    body('platoons')
        .isArray({min: 1})
        .withMessage(errorMessages.PLATOON_REQUIRED),
    body('platoons.*')
        .isMongoId()
        .withMessage(errorMessages.invalidId('platoons'))
        .bail()
        .customSanitizer((value) => {
          return Types.ObjectId(value);
        }),
    body('ranks')
        .isArray({min: 1})
        .withMessage(errorMessages.RANK_REQUIRED),
    body('ranks.*')
        .isMongoId()
        .withMessage(errorMessages.invalidId('ranks'))
        .bail()
        .customSanitizer((value) => {
          return Types.ObjectId(value);
        }),
    body('pointSystemId')
        .exists()
        .withMessage(errorMessages.POINT_SYSTEM_REQUIRED)
        .isMongoId()
        .withMessage(errorMessages.invalidId('pointSystemId'))
        .bail()
        .customSanitizer((value) => {
          return Types.ObjectId(value);
        }),
    body('pioneers')
        .if(body('pioneers').exists())
        .isNumeric({no_symbols: true})
        .withMessage(errorMessages.numericOnly('pioneers')),
    body('wspecs')
        .if(body('wspecs').exists())
        .isNumeric({no_symbols: true})
        .withMessage(errorMessages.numericOnly('wspecs')),
    body('officers')
        .if(body('officers').exists())
        .isNumeric({no_symbols: true})
        .withMessage(errorMessages.numericOnly('officers')),
    body()
        .custom((value, {req}) => {
          if (!req.body.pioneers && !req.body.wspecs && !req.body.officers) {
            throw new Error(errorMessages.REQUIRED_QUANTITY);
          }
          return true;
        }),
    body('statusNotAllowed')
        .if(body('statusNotAllowed').exists())
        .isArray({min: 1})
        .withMessage(errorMessages.STATUS_NOT_ALLOWED),
    body('statusNotAllowed.*')
        .if(body('statusNotAllowed').exists())
        .isMongoId()
        .withMessage(errorMessages.invalidId('statusNotAllowed'))
        .bail()
        .customSanitizer((value) => {
          return Types.ObjectId(value);
        }),
    body('onlyStatus')
        .if(body('onlyStatus').exists())
        .isBoolean()
        .withMessage(errorMessages.booleanOnly('onlyStatus'))
        .if(body('statusNotAllowed').exists())
        .custom((value, {req}) => {
          if (value) {
            throw new Error(
                'onlyStatus can only be false if statusNotAllowed provided',
            );
          }
          return true;
        }),
  ];
};

const router = Router();
router.use(auth);

router.route('/')
    .get(eventsController.getAll);
router.get('/:eventId', [
  param('eventId')
      .isMongoId()
      .withMessage(errorMessages.INVALID_EVENT_ID)
      .bail()
      .customSanitizer((val) => Types.ObjectId(val)),
], eventsController.getOne);

router.post('/delete/:eventId', [
  param('eventId')
      .isMongoId()
      .withMessage(errorMessages.INVALID_EVENT_ID)
      .bail()
      .customSanitizer((val) => Types.ObjectId(val)),
  body('revert')
      .if(body('revert').exists())
      .isBoolean()
      .withMessage(errorMessages.booleanOnly('revert'))
      .toBoolean(),
  expressValidation,
], eventsController.delete);

router.post('/create', [
  body('name')
      .if(body('name').exists())
      .notEmpty()
      .withMessage(errorMessages.INVALID_NAME),
  body('date')
      .notEmpty()
      .withMessage(errorMessages.DATE_REQUIRED)
      .custom((val) => {
        if (!moment(val, 'DD-MM-YYYY', true).isValid()) {
          throw new Error(errorMessages.DATE_FORMAT);
        }
        return true;
      }),
  body('pointSystemId')
      .notEmpty()
      .withMessage(errorMessages.POINT_SYSTEM_REQUIRED)
      .isMongoId()
      .withMessage(errorMessages.INVALID_POINT_SYSTEM_ID)
      .customSanitizer((val) => Types.ObjectId(val)),
  body('pointAllocation')
      .notEmpty()
      .withMessage(errorMessages.POINT_ALLOCATION_REQUIRED)
      .isNumeric({no_symbols: true})
      .withMessage(errorMessages.INVALID_POINT_ALLOCATION)
      .toInt(),
  body('personnels')
      .notEmpty()
      .withMessage(errorMessages.PERSONNEL_REQUIRED)
      .isArray({min: 1})
      .withMessage(errorMessages.PERSONNEL_REQUIRED),
  body('personnels.*')
      .isMongoId()
      .withMessage(errorMessages.INVALID_PERSONNEL_ID)
      .bail()
      .customSanitizer((value) => {
        return Types.ObjectId(value);
      }),
  expressValidation,
], eventsController.create);

router.post('/generate', [
  generatorValidator(),
  expressValidation,
], eventsController.generate);

router.use(errorHandler.NOT_IMPLEMENTED);
router.use(errorHandler.API);

module.exports = router;
