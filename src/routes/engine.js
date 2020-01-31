const { Router } = require("express");
const EnginesController = require("../controllers/engines");
const errorHandler = require("../middleware/errorHandler");

const router = Router();

router.get("/purge/all", EnginesController.purgeAll);
router.get("/purge/status", EnginesController.purgeStatus);
router.get("/purge/events", EnginesController.purgeEvents);
router.get("/purge/blockout", EnginesController.purgeBlockout);
router.get("/purge/eventdates", EnginesController.purgeEventDates);

router.use(errorHandler.NOT_IMPLEMENTED);
router.use(errorHandler.API);

module.exports = router;
