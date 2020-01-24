const { Router } = require("express");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");
const auth = require("../middleware/auth");
const errorHandler = require("../middleware/errorHandler");
const expressValidation = require("../middleware/expressvalidation");
const accountController = require("../controllers/accounts");

const router = Router();
const accountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message: {
    errors: ["Too many request from this IP, please try again after an hour"]
  }
});

router.use(accountLimiter);
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
  accountLimiter,
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
