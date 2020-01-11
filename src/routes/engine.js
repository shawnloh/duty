const { Router } = require("express");
const EnginesController = require("../controllers/engines");
const errorHandler = require("../middleware/errorHandler");

const router = Router();

router.get("/purge", EnginesController.purgeAll);

router.use(errorHandler.NOT_IMPLEMENTED);
router.use(errorHandler.API);

module.exports = router;
