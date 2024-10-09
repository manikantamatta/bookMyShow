const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId; 
const foodSchema=new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}
})
const BookingSchema = new Schema({
    user_id: { type: ObjectId, required: true,index: true},  // Here indexing by user is better.
    entity_id: { type: ObjectId, required: true },
    entity: { type: String, required: true },
    entity_name: { type: String, required: true },
    location: { type: String, required: true },
    transaction_id: { type: ObjectId, required: true },
    show_time: { type: Date, required: true },
    amount: { type: Number, required: true },
    seats: { type: [String], required: true },
    food: { type: [foodSchema], required: false },

}, { timestamps: true });


const Booking = mongoose.model('bookings', BookingSchema);
module.exports = Booking;