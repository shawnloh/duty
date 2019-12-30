const {Router} = require('express');
const {body} = require('express-validator');
const moment = require('moment');
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
  STATUS_NOT_ALLOWED: 'statusNotAllowed must contain at least 1 status',
  DATE_REQUIRED: 'date must be required',
  DATE_FORMAT: 'date must be in DD-MM-YYYY format',
  numericOnly: function(title) {
    return `${title} ${this.NUMERIC_VALUE_ONLY}`;
  },
  booleanOnly: function(title) {
    return `${title} ${this.BOOLEAN_VALUE_ONLY}`;
  },
  invalidId: function(title) {
    return `${title} contain 1 or more invalid id`;
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
        .customSanitizer((value) => {
          return Types.ObjectId(value);
        }),
    body('ranks')
        .isArray({min: 1})
        .withMessage(errorMessages.RANK_REQUIRED),
    body('ranks.*')
        .isMongoId()
        .withMessage(errorMessages.invalidId('ranks'))
        .customSanitizer((value) => {
          return Types.ObjectId(value);
        }),
    body('pointSystemId')
        .exists()
        .withMessage(errorMessages.POINT_SYSTEM_REQUIRED)
        .isMongoId()
        .withMessage(errorMessages.invalidId('pointSystemId'))
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

router.post('/create', [
  expressValidation,
], eventsController.create);

router.post('/generate', [
  generatorValidator(),
  expressValidation,
], eventsController.generate);

router.use(errorHandler.NOT_IMPLEMENTED);
router.use(errorHandler.API);

module.exports = router;
