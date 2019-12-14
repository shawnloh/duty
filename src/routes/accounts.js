const {Router} = require('express');
const auth = require('../middleware/auth');
const accountController = require('../controllers/accounts');

// eslint-disable-next-line new-cap
const router = Router();

router.post('/login', accountController.login);
router.post('/register', auth, accountController.register);
router.get('/me', auth, accountController.me);
router.post('/logout', auth, accountController.logout);

module.exports = router;
