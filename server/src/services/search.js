const Movie = require("../models/movie");
const Cinema = require("../models/cinema");
const Event = require("../models/event");

async function getResults(searchQuery, cityQuery) {
    try {
        const [moviesResult, cinemasResult,eventsResult] = await Promise.allSettled([
            Movie.find({ name: { $regex: new RegExp(searchQuery, "i") } },{name:1}).sort({ ratedby: 1 }).limit(5),
            Cinema.find({ name: { $regex: new RegExp(searchQuery, "i") }, city: cityQuery },{name:1}).limit(5),
            Event.find({ name: { $regex: new RegExp(searchQuery, "i") }, city: cityQuery },{name:1}).limit(5)

        ]);
        const movies = moviesResult.status === 'fulfilled' ? moviesResult.value : [];
        const cinemas = cinemasResult.status === 'fulfilled' ? cinemasResult.value : [];
        const events = eventsResult.status === 'fulfilled' ? eventsResult.value : [];


        return { movies, cinemas,events};
    } catch (error) {
        throw new Error("Error fetching search results");
    }
}


module.exports = { getResults };