const Movie = require("../models/movie");
const Show = require("../models/show");
const { buildQuery } = require("../utils/utils");

async function getAll() {
  try {
    const movies = await Movie.find({});
    return movies;
  } catch (error) {
    throw new Error("Error fetching movies");
  }
}

async function getFilteredResult(filters) {
  try {
    const query = buildQuery(filters, { start_time: { $gte: new Date()} });
    const shows = await Show.aggregate([
      { $match: query },
      { $group: { _id: "$movie_id", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "_id",
          as: "movieDetails",
        },
      },
      { $unwind: "$movieDetails" },
      
      {
        $project: {
          name: "$movieDetails.name",
          rating: "$movieDetails.rating",
          ratedby: "$movieDetails.ratedby",
          image_url: "$movieDetails.image_url",
          movie_rated: "$movieDetails.movie_rated",
          genre: "$movieDetails.genre",
        },
      },
    ]);
    return shows;
  } catch (error) {
    throw new Error("Error fetching movies");
  }
}

async function getFilters(location) {
    try {
      const today = new Date();
      const result = await Show.aggregate([
        {
          $match: {
            city: location,
            start_time: { $gte: today },
          }
        },
        {
          $lookup: {
            from: "movies",
            let: { movieId: "$movie_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$movieId"] } } },
              { $project: { genre: 1, _id: 0 } }
            ],
            as: "movieDetails",
          }
        },
        { $unwind: "$movieDetails" }, 
        { $unwind: "$movieDetails.genre" }, 
        {
          $group: {
            _id: null,
            languages: { $addToSet: "$language" },
            formats: { $addToSet: "$format" },
            genres: { $addToSet: "$movieDetails.genre" }
          }
        },
      ]);
      
      if (result.length > 0) {
        return {
          languages: result[0].languages,
          formats: result[0].formats,
          genres: result[0].genres
        };
      } else {
        return { languages: [], formats: [], genres: [] };
      }
      
    } catch (error) {
      throw new Error("Error fetching filters");
    }
  }
  

async function getById(id) {
  try {
    const movie = await Movie.findById(id,{__v:0,createdAt:0,updatedAt:0});
    return movie;
  } catch (error) {
    throw new Error("Error fetching movie");
  }
}

async function getUpcoming(filters=null) {
    try {
        const query = buildQuery(filters, { release_date: { $gte: new Date() } });
        delete query.city;
        const movies = await Movie.aggregate([
            { $match: query }, // Match the provided query
            {
                $lookup: {
                    from: "shows",
                    localField: "_id",
                    foreignField: "movie_id",
                    as: "showDetails",
                },
            },
            {
                $addFields: {
                    showCount: { $size: "$showDetails" } // Add a field to count the number of showDetails
                }
            },
            { $match: { showCount: 0 } }, // Match movies with no shows
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image_url: 1,
                    release_date: 1,
                    likes: 1,
                    genre: 1,
                }
            }
        ]);
        
        return movies;
  } catch (error) {
    throw new Error("Error fetching Upcoming movies");
  }
}

async function addMovie(movie){
  try{
    const newMovie = new Movie(movie);
    await newMovie.save();
    return newMovie;
  } catch (error) {
    throw new Error("Error adding movie");
  }
}

async function updateMovie(id,movie){
  try{
    await Movie.updateOne({ _id: id }, movie);
    return {message:"Successfully Updated"}; 
  }
  catch(error){
    throw new Error("Error updating movie");
  }
}

async function getNames(){
  try{
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const movies = await Movie.find(
      { release_date: { $gte: oneYearAgo } },
      { name: 1,genre:1,_id: 1 }
    );
    return movies;
  }
  catch(error){
    throw new Error("Error fetching movie names");
  }
}

module.exports = { getAll, getFilteredResult, getById, getUpcoming ,getFilters,addMovie,updateMovie,
  getNames
};
