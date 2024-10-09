const express = require("express");
const router = new express.Router();
const cinema_controller = require("../controllers/cinema.js");

router.get("/get-shows-by-cinema/:cinemaId", cinema_controller.getShowsByCinema);
router.get("/", cinema_controller.getAllcinemas);
router.get("/:city", cinema_controller.getAllcinemasByCity);
router.get("/cinemaDetails/:cinemaId", cinema_controller.getCinemaDetails);

router.post("/", cinema_controller.addCinema);
router.put("/:id", cinema_controller.updateCinema);

module.exports = router;