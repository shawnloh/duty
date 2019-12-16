const {Router} = require('express');
const {body, param} = require('express-validator');
const ranksController = require('../controllers/ranks');
const auth = require('../middleware/auth');
const expressValidation = require('../middleware/expressvalidation');

const router = Router();

router.use(auth);

router.get('/', ranksController.viewAll);
router.post('/', [
  body('name')
      .notEmpty({ignore_whitespace: true})
      .withMessage('Name is required to create a rank')
      .isString()
      .withMessage('Name is required to create a rank'),
  expressValidation,
], ranksController.create);

router.route('/:rankId')
    .all([
      param('rankId')
          .isMongoId()
          .withMessage('Please provide a valid id'),
      expressValidation,
    ])
    .put(ranksController.update)
    .delete(ranksController.delete);

router.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name == 'ValidationError') {
    console.error('Error Validating!', err);
    return res.status(422).json(err);
  }
  res.status(500).json({'message': 'Internal Server Error'});
});

module.exports = router;
