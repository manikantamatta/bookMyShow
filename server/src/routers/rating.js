const express = require("express");
const router = new express.Router();
const rating_controller = require("../controllers/rating");
const auth_middleware = require("../middlewares/auth");

router.post("/add-rating",auth_middleware.authenticateToken,rating_controller.addRating);
router.get("/movie/:id",rating_controller.getRatingByMovieId);
router.get("/user/:userId/:movieId",rating_controller.getRatingForMovieByUser);
router.post("/interested",rating_controller.addInterested);
module.exports = router;