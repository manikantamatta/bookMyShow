const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId; 
const itemSchema = new Schema({
    id:{type: ObjectId, required: true},
    name:{type: String, required: true},
})
const businessSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessRequired: { type: Boolean, default: true },  //If true, then access is required
    Movitems: { type: [itemSchema] },
    Cinitems: { type: [itemSchema] },
    Eveitems: { type: [itemSchema] },
    access: { type: [String], default: [] },
    }, { timestamps: true });

const Business = mongoose.model('businesses', businessSchema);
module.exports = Business;