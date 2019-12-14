const {Router} = require('express');
const eventsController = require('../controllers/events');
const auth = require('../middleware/auth');

const router = Router();
router.use(auth);

router.route('/')
    .get(eventsController.getAll);
module.exports = router;
