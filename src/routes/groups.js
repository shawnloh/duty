const {Router} = require('express');
const {body, param} = require('express-validator');

const groupController = require('../controllers/group');
const auth = require('../middleware/auth');
const expressValidation = require('../middleware/expressValidation');
const errorHandler = require('../middleware/errorHandler');

const router = Router();

router.use(auth);

router.get('/', groupController.viewAll);
router.post('/new', [
  body('name')
      .notEmpty()
      .withMessage('Name is required to create a new group'),
  body('platoons')
      .isArray({min: 1})
      .withMessage('An array of at least 1 platoon is required'),
  body('ranks')
      .isArray({min: 1})
      .withMessage('An array of at least 1 rank is required'),
  expressValidation,
], groupController.create);
router.put('/:groupId', [
  param('groupId')
      .notEmpty()
      .withMessage('Group id is required for updating group')
      .isMongoId()
      .withMessage('Group id must be a valid id'),
  expressValidation,
], groupController.update);
router.delete('/:groupId', [
  param('groupId')
      .notEmpty()
      .withMessage('Group id is required for updating group')
      .isMongoId()
      .withMessage('Group id must be a valid id'),
  expressValidation,
], groupController.delete);
router.use(errorHandler.API);

module.exports = router;
