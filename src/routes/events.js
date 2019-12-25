const {Router} = require('express');
const eventsController = require('../controllers/events');
const errorHandler = require('../middleware/errorHandler');
const auth = require('../middleware/auth');

const router = Router();
router.use(auth);

router.route('/')
    .get(eventsController.getAll);
router.use(errorHandler.NOT_IMPLEMENTED);
module.exports = router;
