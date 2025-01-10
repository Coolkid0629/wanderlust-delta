const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middlewares.js");
const controller = require("../controllers/reviews.js");

// POST Reviews Routing
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(controller.createNewReview)
);

// DELETE Reviews Routing
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(controller.destroyReview)
);

module.exports = router;
