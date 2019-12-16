const {Router} = require('express');
const {body} = require('express-validator');
const auth = require('../middleware/auth');
const expressValidation = require('../middleware/expressvalidation');
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
      .isArray(),
  body('onlyStatus')
      .optional()
      .isBoolean()
      .withMessage('Only true or false is allowed for onlyStatus'),
  expressValidation,
], pointsController.create);

module.exports = router;
