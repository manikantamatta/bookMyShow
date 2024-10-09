const Event=require('../models/event');
const { getDayGroupInfo } = require('../utils/utils');
async function getfiltered(filters) {
    const query = {};
    const today = new Date();
    if (filters.languages) {
        query.languages = { $in: filters.languages.split("|") }; // Ensure valid date format
    }
    
    if (filters.location) {
        query.city = filters.location; // Filter by city
    }
    
    if (filters.category) {
        query.category = { $in: filters.category.split("|") }; // Filter by category
    }
    if(filters.DateGroup){
        const dayGroupFilter = getDayGroupInfo(filters.DateGroup);
        if (dayGroupFilter) {
            query.time = dayGroupFilter;
        }

    }
    try {
        const events = await Event.find(query,{name:1,interested:1,ticketInfo:1,city:1,location:1,languages:1,date:1,time:1,duration:1,image_url:1}).sort({date:1});
        return events;
    } catch (error) {
        console.error("Error fetching filtered events:", error);
        throw error;
    }
}

async function getById(id) {
    try {
        const event = await Event.findById(id);
        return event;
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw error;
    }
}

async function getTicketInfo(id) {
    try {
        const event = await Event.findById(id, { ticketInfo: 1 ,_id:0});
        return event;
    } catch (error) {
        console.error("Error fetching ticket info for event:", error);
        throw error;
    }
}

async function add(new_event){
    try{
        if (typeof new_event.ticketInfo === 'string') {
            new_event.ticketInfo = JSON.parse(new_event.ticketInfo);
        }
        const newEvent = new Event(new_event);
        await newEvent.save();
        return newEvent;
      } catch (error) {
        console.log(error)
        throw new Error("Error adding Event");
      }
}

async function updateSeatEvent(eventId, seatInfo) {
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error("Event not found");
        }
        seatInfo.forEach(seat => {
            const [quantity, type] = seat.split(' ');
            const ticket = event.ticketInfo.find(ticket => ticket.type === type);
            if (ticket) {
                ticket.quantity -= parseInt(quantity, 10);
                if (ticket.quantity < 0) {
                    throw new Error(`Not enough tickets available for ${type}`);
                }
            } else {
                throw new Error(`Ticket type ${type} not found`);
            }
        });

        await event.save();
        return event;
    } catch (error) {
        console.error("Error updating seat info:", error);
        throw error;
    }
}

module.exports = { getfiltered ,getById,getTicketInfo,add,updateSeatEvent};
