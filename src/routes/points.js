const { Router } = require("express");
const { body, param } = require("express-validator");
const auth = require("../middleware/auth");
const expressValidation = require("../middleware/expressvalidation");
const errorHandler = require("../middleware/errorHandler");
const pointsController = require("../controllers/points");

const router = Router();

router.use(auth);

router.get("/", pointsController.viewAll);

router.post(
  "/",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("A name is required for new points system"),
    expressValidation
  ],
  pointsController.create
);

router
  .route("/:pointsId")
  .all([
    param("pointsId")
      .isMongoId()
      .withMessage("Invalid point system id")
  ])
  .put(
    [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("A name is required to update existing point system"),
      expressValidation
    ],
    pointsController.update
  )
  .delete(expressValidation, pointsController.delete);

router.use(errorHandler.NOT_IMPLEMENTED);
router.use(errorHandler.API);

module.exports = router;
