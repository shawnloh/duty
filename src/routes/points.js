const {Router} = require('express');
const {body} = require('express-validator');
const auth = require('../middleware/auth');
const expressValidation = require('../middleware/expressValidation');
const errorHandler = require('../middleware/errorHandler');
const pointsController = require('../controllers/points');

const router = Router();

router.use(auth);

// View all points
router.get('/', pointsController.viewAll);
router.post('/new', [
  body('name')
      .trim()
      .notEmpty()
      .withMessage('A name is required for new points system'),
  body('group')
      .isMongoId()
      .withMessage('Invalid group id')
      .notEmpty()
      .withMessage('A group is required for new points system'),
  body('statusNotAllowed')
      .optional()
      .isArray()
      .withMessage('Only array of status id is allowed'),
  body('onlyStatus')
      .optional()
      .isBoolean()
      .withMessage('Only true or false is allowed for onlyStatus'),
  expressValidation,
], pointsController.create);

router.use(errorHandler.API);

module.exports = router;
