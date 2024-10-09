const event_service = require('../services/event');
const upload = require("../utils/imgUpload");

async function getFilteredEvents(req,res){
    res.setHeader('Content-Type', 'application/json');
    try{
        const filters=req.query;
        const events = await event_service.getfiltered(filters);
        res.status(200).send(events);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function getEventById(req,res){
    res.setHeader('Content-Type', 'application/json');
    try{
        const event = await event_service.getById(req.params.id);
        res.status(200).send(event);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}
async function getEventTicketInfo(req,res){
    res.setHeader('Content-Type', 'application/json');
    try{
        const event = await event_service.getTicketInfo(req.params.id);
        res.status(200).send(event);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function addEvent(req,res){
    upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
    
        try {
          const eventData = {
            ...req.body,
            languages: req.body.languages ? req.body.languages.split(',').map(item => item.trim()) : [],
            image_url: req.file ? req.file.path : ''
          };
        const event = await event_service.add(eventData);
        res.status(200).send(event);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});
}

module.exports={getFilteredEvents,getEventById,getEventTicketInfo,addEvent};