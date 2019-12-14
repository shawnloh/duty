const {Router} = require('express');
const statusController = require('../controllers/status');
const auth = require('../middleware/auth');

const router = Router();
router.use(auth);

router.route('/')
    .get(statusController.getAll)
    .post(statusController.create);

router.route('/:statusId')
    .delete(statusController.delete)
    .put(statusController.update);

module.exports = router;
