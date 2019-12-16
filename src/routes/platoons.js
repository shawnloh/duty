const {Router} = require('express');
const {body, param} = require('express-validator');
const platoonsController = require('../controllers/platoons');
const auth = require('../middleware/auth');
const expressValidation = require('../middleware/expressvalidation');

const router = Router();

router.use(auth);

router.get('/', platoonsController.viewAll);
router.post('/', [
  body('name')
      .notEmpty({ignore_whitespace: true})
      .withMessage('Name is required to create a platoon')
      .isString()
      .withMessage('Name is required to create a platoon'),
  expressValidation,
], platoonsController.create);

router.route('/:platoonId')
    .all([
      param('platoonId')
          .isMongoId()
          .withMessage('Please provide a valid id'),
      expressValidation,
    ])
    .put(platoonsController.update)
    .delete(platoonsController.delete);

router.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name == 'ValidationError') {
    console.error('Error Validating!', err);
    return res.status(422).json(err);
  }
  res.status(500).json({'message': 'Internal Server Error'});
});

module.exports = router;
