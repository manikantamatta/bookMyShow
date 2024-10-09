const redis=require('../db/redis');
const show_service=require('../services/show');
const event_Service=require('../services/event');
const Booking=require('../models/booking');
const RecentBooking=require('../models/recentBooking');

async function isSeatAvaialble(showKey){
    try{
        const seats=await redis.get(showKey);
        return seats===null;
    }catch(error){
        console.error('Error Checking Seat availability ',error);
    }
}

async function ReserveSeat(showKey,userId){
    try{
        const result = await redis.set(showKey, userId, 'EX', 300); // 5 minutes expiration
        return result === 'OK';
    }catch(error){
        console.error('Error Reserving Seat',error);
    }
}

async function isBooked(showId, categoryId, rowId, seatId) {
    try {
        const showDetails = await show_service.getById(showId);
        const seatStatus = showDetails.seat_info[categoryId].status[rowId][seatId];
        const seatPrice = showDetails.seat_info[categoryId].price;

        if (seatStatus === '0') {
            return { isBooked: false, price: seatPrice };
        }
        return { isBooked: true, price: seatPrice };
    } catch (error) {
        console.error('Error Checking Seat availability', error);
        return { isBooked: null, price: null }; // Return a consistent structure in case of error
    }
}

async function createBooking(booking){
    try{
        const bookingModel=new Booking(booking);
        const result=await bookingModel.save();
        return result
    }catch(error){
        console.error('Error Creating Booking',error);
    }
}

async function AddRecentBooking(booking){
    try{
        const userId = booking.user_id;
        const recentBooking = await RecentBooking.findOne({ user_id: userId });
        if (!recentBooking) {
            const newRecentBooking = new RecentBooking({ user_id: userId, last_bookings: [booking] });
            const result = await newRecentBooking.save();
            return result;
        }
        if (recentBooking.last_bookings.length === 5) {
            recentBooking.last_bookings.pop();
        }
        recentBooking.last_bookings.unshift(booking);
        const result = await recentBooking.save();
        return result;
    } catch (error) {
        console.error('Error Adding Recent Booking', error);
    }
}

async function getAllBookingsForUser(userId){
    try{
        const bookings=await Booking.find({user_id:userId},{__v:0,createdAt:0,updatedAt:0,booking_id:0}).sort({createdAt:-1});
        return bookings;
    }catch(error){
        console.error('Error Getting All Bookings For User',error);
    }
}

async function getRecentBookingsForUser(userId){
    try{
        const bookings=await RecentBooking.find({user_id:userId},{__v:0,createdAt:0,updatedAt:0,booking_id:0})
        return bookings;
    }catch(error){
        console.error('Error Getting Recent Bookings For User',error);
    }
}



module.exports={isSeatAvaialble,ReserveSeat,isBooked,createBooking,getAllBookingsForUser,getRecentBookingsForUser,
    AddRecentBooking
};