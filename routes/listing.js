const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const controller = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(controller.index)) // GET all listings
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(controller.createListing)
  ); // POST new listing

// NEW Routing
router.get("/new", isLoggedIn, controller.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(controller.showListing)) // SHOW specific listing
  .put(
    // UPDATE specific listing
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(controller.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(controller.deleteListing)); // DELETE specific listing

// EDIT Routing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(controller.showEditForm)
);

module.exports = router;
