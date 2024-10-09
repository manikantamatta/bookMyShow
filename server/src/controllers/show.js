const show_service = require('../services/show');

async function getShowByMovieId(req,res){
    try {
        const id = req.params.id;
        const format=req.query.format;
        const location=req.query.location;
        const language=req.query.language;
        const shows = await show_service.getAvailableShowsByFormat(id,format,location,language);
        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getShowById(req,res){
    try {
        const id = req.params.id;
        const show = await show_service.getById(id);
        res.status(200).json(show);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getTimeSlots(req,res){
    try {
        const id = req.params.id;
        const date=req.body.date
        const show = await show_service.getSlots(id,date);
        res.status(200).json(show);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function addShow(req,res){
    try{
        const showData=req.body;
        const show=await show_service.add(showData);
        res.status(200).json(show);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}
module.exports={getShowByMovieId,getShowById,getTimeSlots,addShow};