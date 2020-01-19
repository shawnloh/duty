const { Router } = require("express");
const { body, param } = require("express-validator");
const errorHandler = require("../middleware/errorHandler");
const expressValidation = require("../middleware/expressvalidation");
const statusController = require("../controllers/status");
const auth = require("../middleware/auth");

const router = Router();
router.use(auth);

router
  .route("/")
  .get(statusController.getAll)
  .post(
    [
      body("name")
        .notEmpty()
        .withMessage("Status name is required for creation"),
      expressValidation
    ],
    statusController.create
  );

router
  .route("/:statusId")
  .all([
    param("statusId")
      .isMongoId()
      .withMessage("Please provide a valid status id")
  ])
  .delete(expressValidation, statusController.delete)
  .put(
    [
      body("name")
        .notEmpty()
        .withMessage("Name is required for updating current status"),
      expressValidation
    ],
    statusController.update
  );

router.use(errorHandler.NOT_IMPLEMENTED);
router.use(errorHandler.API);
module.exports = router;
