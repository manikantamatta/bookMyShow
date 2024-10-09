const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId
const seatSchema = new Schema({
    type: { type: String, required: true },
    status: { type: [String],required:true },
    price: { type: Number, required: true },
  });
const showSchema = new Schema({
    movie_id: { type: ObjectId, required: true },
    cinema_id: { type: ObjectId, required: true },
    start_time:{ type: Date, required: true },
    end_time:{ type: Date, required: true },
    show_date:{ type: Date, required: true },
    city:{type:String,required:true},
    genre:{type:[String],required:false,default:[]},
    language:{type:String,required:true},
    format:{type:String,required:true},
    screen:{type:Number,required:true},
    seat_info:{type:[seatSchema],required:true},
}, { timestamps: true });

const Show = mongoose.model('shows', showSchema);
module.exports = Show;



