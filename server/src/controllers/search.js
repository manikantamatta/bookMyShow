const search_service = require('../services/search');
const logger = require('../utils/winston');

async function getSearchResult(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const search = req.query.search;
    const city = req.query.city;

    try {
        const result = await search_service.getResults(search, city);
        res.status(200).json(result);

    } catch (error) {
        logger.error('Error fetching search results', {
            message: error.message,
            stack: error.stack,
            search,
            city
        });

        res.status(500).json({ message: 'Internal Server Error. Could not fetch search results' });
    }
}

module.exports = { getSearchResult };
