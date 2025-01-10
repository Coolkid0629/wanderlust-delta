const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const controller = require("../controllers/users.js");

router
  .route("/signup")
  .get(controller.getSignupForm) // GET signup form
  .post(wrapAsync(controller.signupUser)); // POST new user

router
  .route("/login")
  .get(controller.getLoginForm) // GET login form
  .post(
    // POST login user
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(controller.loginUser)
  );

// GET Logout User
router.get("/logout", controller.logoutUser);

module.exports = router;
