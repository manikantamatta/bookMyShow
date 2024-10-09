const Cinema = require("../models/cinema");
const Show = require("../models/show");
const Movie = require("../models/movie");
ObjectId = require('mongodb').ObjectId;


async function getAllByCity(city, page, limit) {
    try {
        const cinema = await Cinema.find({ city: { $regex: new RegExp(city, "i") }},{_id:1,name:1,city:1,location:1}).skip((page - 1) * limit).limit(limit);
        const totalCinemas = await Cinema.countDocuments({ city: { $regex: new RegExp(city, "i") } });
        return {cinema:cinema,totalCinemas:totalCinemas};
    } catch (error) {
        throw new Error("Error fetching cinema");
    }
}

async function getAll() {
    try {
        const cinema = await Cinema.find({});
        return cinema;
    } catch (error) {
        throw new Error("Error fetching cinema");
    }
}

async function getShowsByCinemaGrouped(cinemaId) {
  try {
    const results = await Show.aggregate([
      {
        $match: {
          cinema_id: new ObjectId(cinemaId)
        }
      },
      {

        $group: {
          _id: { date: "$show_date", movie_id: "$movie_id" },
          shows: {
            $push: {
              _id: "$_id",
              start_time: "$start_time",
              end_time: "$end_time",
              format: "$format",
              language: "$language",
              genre: "$genre",
              seat_info: "$seat_info"
            }
          }
        }
      },
      {
        // Regroup by date
        $group: {
          _id: "$_id.date",
          movies: {
            $push: {
              movie_id: "$_id.movie_id",
              shows: "$shows"
            }
          }
        }
      },
      {
        // Lookup movie details from the Movie collection
        $lookup: {
          from: "movies",
          localField: "movies.movie_id",
          foreignField: "_id",
          as: "movie_details"
        }
      },
      {
        // Unwind the movie_details array
        $unwind: "$movies"
      },
      {
        // Join movie_details with movies based on movie_id
        $lookup: {
          from: "movies",
          localField: "movies.movie_id",
          foreignField: "_id",
          as: "movie_detail"
        }
      },
      {
        // Unwind the movie_detail array
        $unwind: "$movie_detail"
      },
      {
        // Add movie_name to each movie object
        $addFields: {
          "movies.movie_name": "$movie_detail.name"
        }
      },
      {
        // Regroup movies to restore original structure
        $group: {
          _id: "$_id",
          movies: {
            $push: {
              movie_id: "$movies.movie_id",
              movie_name: "$movies.movie_name",
              shows: "$movies.shows"
            }
          }
        }
      },
      {
        // Project the final result
        $project: {
          _id: 0,
          date: "$_id",
          movies: 1
        }
      },
      {
        // Sort by date in ascending order
        $sort: { "date": 1 }
      }
    ]);

    return results;
  } catch (error) {
    throw new Error("Error fetching shows by cinema");
  }
}





async function getCinemaDetails(cinemaId) {
    try {
        const cinema = await Cinema.findById(cinemaId);
        return cinema;
    } catch (error) {
        throw new Error("Error fetching cinema details");
    }
}
async function add(cinemaData) {
  try {
      const cinema = new Cinema(cinemaData);
      await cinema.save();
      return cinema;
  } catch (error) {
      console.error("Error details:", error);
      throw new Error("Error adding cinema: " + error.message);
  }
}

async function update(id, cinemaData) {
    try {
        const cinema = await Cinema.findByIdAndUpdate(id, cinemaData, { new: true });
        return cinema;
    }
    catch (error) {
        throw new Error("Error updating cinema");
    } 
}

module.exports = { getAllByCity,getAll,getShowsByCinemaGrouped, getCinemaDetails,update,add};