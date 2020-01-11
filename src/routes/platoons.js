const { Router } = require("express");
const { body, param } = require("express-validator");

const platoonsController = require("../controllers/platoons");
const auth = require("../middleware/auth");
const expressValidation = require("../middleware/expressValidation");
const errorHandler = require("../middleware/errorHandler");

const router = Router();

router.use(auth);

router.get("/", platoonsController.viewAll);
router.post(
  "/",
  [
    body("name")
      .notEmpty({ ignore_whitespace: true })
      .withMessage("Name is required to create a platoon")
      .isString()
      .withMessage("Name is required to create a platoon"),
    expressValidation
  ],
  platoonsController.create
);

router
  .route("/:platoonId")
  .all([
    param("platoonId")
      .isMongoId()
      .withMessage("Please provide a valid platoon id"),
    expressValidation
  ])
  .put(platoonsController.update)
  .delete(platoonsController.delete);

router.use(errorHandler.NOT_IMPLEMENTED);
router.use(errorHandler.API);

module.exports = router;
