const {Router} = require('express');
// const groupController = require('../controllers/group');
const auth = require('../middleware/auth');


const router = Router();

router.use(auth);

// router.get('/', ranksController.viewAll);
// router.post('/', ranksController.create);
// router.route('/:rankId')
//     .put(ranksController.update)
//     .delete(ranksController.delete);

module.exports = router;
