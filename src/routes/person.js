const {Router} = require('express');
const {body, param} = require('express-validator');
const moment = require('moment');
const expressValidation = require('../middleware/expressvalidation');
const auth = require('../middleware/auth');
const person = require('../models/person');
const status = require('../models/status');
const personnelStatus = require('../models/personnelStatus');
const personController = require('../controllers/person');

const router = Router();


router.use(auth);

router.get('/', personController.viewAll);
router.post('/new', [
  body('rank')
      .isString()
      .withMessage('Rank is required to create new person')
      .notEmpty()
      .withMessage('Rank is required to create new person'),
  body('platoon')
      .isString()
      .withMessage('Person must have a platoon assigned')
      .notEmpty()
      .withMessage('Person must have a platoon assigned'),
  body('name')
      .isString()
      .withMessage('Person must have a name')
      .notEmpty()
      .withMessage('Person must have a name'),
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
], personController.addStatus);

router.route('/:personId/:personnelStatusId')
    .all([
      param('personId')
          .isMongoId()
          .custom(async (id, {req}) => {
            const foundPerson = await person.findById(id).exec();
            if (!foundPerson) {
              return Promise.reject(new Error('Invalid person id'));
            }
            req.person = foundPerson;
          }),
      param('personnelStatusId')
          .isMongoId()
          .withMessage('Please provide a valid personnel status id')
          .custom(async (personnelStatusId, {req}) => {
            const foundStatus = await personnelStatus
                .findById(personnelStatusId)
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
      expressValidation,
    ])
    .delete(personController.deleteStatus)
    .put(personController.updateStatus);

// router.put('/updatestatus/:personnelStatusid', [param('personnelStatusId')
//       .notEmpty()
//       .withMessage('Personnel status id is required')
//       .isMongoId()
//       .withMessage('Please provide a valid personnel status id')
//       .custom(async (personnelStatusId) => {
//         const foundStatus = await personnelStatus.findById(statusId).exec();
//         if (!foundStatus) {
//           return Promise.reject(
//               new Error(
//                   'Invalid personnel status id',
//               ),
//           );
//         }
//       }),
// ],]);


module.exports = router;
