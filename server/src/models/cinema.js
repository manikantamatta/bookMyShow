const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  house_no: { type: String, default: '' },
  street: { type: String, default: '' },
  area: { type: String, default: '' },
  pincode: { type: String, default: '' }
});
const seatSchema = new Schema({
  type: { type: String, required: true },
  status: { type: [String],required:true },
  price: { type: Number, required: true },
});
const seatingArrangementSchema= new Schema({
  screens_no:{type:[Number],required:true},
  seats:{type:[seatSchema],required:true}
});
const cinemaSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: addressSchema, required: true },
  screens: { type: Number, required: true },
  food_service : { type: Boolean, default: false },
  seating_arrangement:{type:[seatingArrangementSchema],required:true}
}, { timestamps: true });

const Cinema = mongoose.model('cinemas', cinemaSchema);
module.exports = Cinema;
