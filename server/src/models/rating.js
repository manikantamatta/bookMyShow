const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId; 
const ratingSchema = new Schema({
    userId: { type: ObjectId, required: true },
    entity: { type: String, required: true },
    entityId: { type: ObjectId, required: true },
    username:{type:String,required:true,default:"Anonymous"},
    rating: { type: Number, required: true },
    review: { type: String, required: false }
},({timestamps:true}));

const Rating = mongoose.model('ratings', ratingSchema);
module.exports = Rating;