const movie_service = require('../services/movie');
const upload = require("../utils/imgUpload");

async function getAllMovies(req, res) {
    res.setHeader('Content-Type', 'application/json');

    try {
        const movies = await movie_service.getAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error. Could Not fetch Movies" });
    }
}
async function getFilteredMovies(req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        const filters = req.query;
        const movies = await movie_service.getFilteredResult(filters);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getMovieById(req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        const movie = await movie_service.getById(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getUpcomingMovies(req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        const filters = req.query;
        const movies = await movie_service.getUpcoming(filters);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getMovieFilters(req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        var location=req.query.location;
        const filters = await movie_service.getFilters(location);
        res.status(200).json(filters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function addMovie(req, res) {
    res.setHeader('Content-Type', 'application/json');
    upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
    
        try {
            const movieData = {
                ...req.body,
                genre: req.body.genre ? req.body.genre.split(',').map(item => item.trim()) : [],
                cast: req.body.cast ? req.body.cast.split(',').map(item => item.trim()) : [],
                crew: req.body.crew ? req.body.crew.split(',').map(item => item.trim()) : [],
                languages: req.body.languages ? req.body.languages.split(',').map(item => item.trim()) : [],
                formats: req.body.formats ? req.body.formats.split(',').map(item => item.trim()) : [],
                formats: req.body.formats ? req.body.formats.split(',').map(item => item.trim()) : [],
                image_url: req.file ? req.file.path : ''
            };
    
          const newMovie = await movie_service.addMovie(movieData);
          return res.status(201).json(newMovie);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      });
}

async function updateMovie(req, res) {
    res.setHeader('Content-Type', 'application/json');
    upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
    
        try {
          const movieData = {
            ...req.body,
            image_url: req.file ? req.file.path : ''
          };
    
          const updatedMovie = await movie_service.update(req.params.id, movieData);
          return res.status(200).json(updatedMovie);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      });
}

async function getMovieNames(req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        const movies = await movie_service.getNames();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error. Could Not fetch Movies" });
    }
}

async function updateMovieById(req, res){
    
}

module.exports = { getAllMovies,getFilteredMovies ,getMovieById,getUpcomingMovies,getMovieFilters,addMovie,updateMovie,getMovieNames,
    updateMovieById
};

