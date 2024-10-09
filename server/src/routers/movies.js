const express = require("express");
const router = new express.Router();
const movie_controller = require("../controllers/movie");

router.get("/names",movie_controller.getMovieNames);
router.get("/",movie_controller.getFilteredMovies);
router.get("/filters",movie_controller.getMovieFilters);
router.get("/upcoming",movie_controller.getUpcomingMovies);
router.get("/:id",movie_controller.getMovieById);
router.post("/",movie_controller.addMovie);

router.put("/:id",movie_controller.updateMovieById);


module.exports = router;