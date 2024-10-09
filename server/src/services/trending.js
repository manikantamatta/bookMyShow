const Booking = require('../models/booking');
const redis = require('../db/redis');
const { getlast7days } = require('../utils/utils');

async function getTopBooked(date) {
    try {
        const BookingData = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: date },
                    entity: 'MOV'
                }
            },
            {
                $lookup: {
                    from: 'shows',
                    localField: 'entity_id',
                    foreignField: '_id',
                    as: 'showDetails'
                }
            },
            {
                $unwind: '$showDetails'
            },
            {
                $group: {
                    _id: '$showDetails.movie_id',
                    count: { $sum: 1 },
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 4  // Number of trending movies to be displayed
            },
            {
                $lookup: {
                    from: 'movies',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'movieDetails'
                }
            },
            {
                $unwind: '$movieDetails'
            },
            {
                $lookup: {
                    from: 'ratings',
                    localField: '_id',
                    foreignField: 'entityId',
                    as: 'MovieReviews'
                }
            },
            {
                $addFields: {
                    MovieReviews: {
                        $filter: {
                            input: '$MovieReviews',
                            as: 'review',
                            cond: { $gte: ['$$review.rating', 7] }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                    movieDetails: {
                        name: 1,
                        image_url: 1,
                        languages:1,
                        genre:1
                    },
                    MovieReviews: {
                        $slice: ['$MovieReviews', 3]
                    },
                }
            },
            {
                $project: {
                    _id: 1,
                    count:1,
                    MovieReviews: {
                        rating: 1,
                        review: 1,
                    },
                    movieDetails: 1,
                }
            }
        ]);
        return BookingData;
    } catch (error) {
        console.error('Error Getting Top Booked', error);
    }
}

async function getTopBookedCached() {
    try {
        const redisKey = `getTopBooked`;
        const date = getlast7days();
        const data = await getTopBooked(date);
        redis.set(redisKey, JSON.stringify(data));
        return { message: 'Data Cached' };
    } catch (error) {
        return { error: 'Error Getting Top Booked Cached' };
    }
}

async function fetchTrendingMovies() {
    try {
        const redisKey = `getTopBooked`;
        const cacheData = await redis.get(redisKey);
        return JSON.parse(cacheData);
    } catch (error) {
        console.error('Error Fetching Trending Movies', error);
    }
}

module.exports = { getTopBooked, getTopBookedCached, fetchTrendingMovies };