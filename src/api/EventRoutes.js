const {Router} = require('express');
const event = require('../models/event');
const auth = require('../middleware/auth');

const router = Router();
router.use(auth);
// User view events
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
router.get('/', async (req, res) => {
  const events = await event.find({}).exec();
  console.log('events', events);
  res.json(events);
});

// User create event and depending on the quantity of pioneers, specs and
// officers, automatically generate and allow user to reroll individual
// personnels. User can choose to enable point awarded to confirmed personnel

module.exports = router;
