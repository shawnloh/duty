const { Router } = require("express");
const { body } = require("express-validator");
const auth = require("../middleware/auth");
const errorHandler = require("../middleware/errorHandler");
const expressValidation = require("../middleware/expressvalidation");
const accountController = require("../controllers/accounts");

const router = Router();

router.post(
  "/login",
  [
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .bail()
      .customSanitizer(val => {
        return val.toLowerCase();
      }),
    body("password")
      .notEmpty()
      .withMessage("Password is required"),
    expressValidation
  ],
  accountController.login
);

router.post(
  "/register",
  [
    auth,
    body("username")
      .notEmpty()
      .withMessage("Username is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required"),
    expressValidation
  ],
  accountController.register
);

router.get("/me", auth, accountController.me);
router.post("/logout", auth, accountController.logout);
router.get("/isauthenticated", accountController.isAuthenticated);
router.use(errorHandler.NOT_IMPLEMENTED);
router.use(errorHandler.API);

module.exports = router;
