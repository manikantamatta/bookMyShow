const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});
const EventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true },
  category: { type: String },
  image_url: { type: String },
  city: { type: String, required: true },
  location : { type: String, required: true },
  interested: { type: Number, default: 0 },
  languages: { type: [String], required: true },
  date: { type: Date, required: true },
  time: { type: Date, required: true },
  ticketInfo: { type: [ticketSchema], required: true },
});

const Event= mongoose.model('events', EventSchema);
module.exports = Event;
