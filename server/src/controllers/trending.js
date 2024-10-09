const trending_service = require('../services/trending');

async function getTrending(req,res){
    try {
        const shows = await trending_service.fetchTrendingMovies();
        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={getTrending};