var mongoose = require("mongoose");


const Schema = mongoose.Schema;
const EventsSchema = new Schema({
    name: {
        type: String,
        trim: true,  
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
        trim: true,
   }],
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transactions",
        trim: true,
   }],
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tickets",
        trim: true,
   }],
    // registered: {
    //     type: Number,
    //     trim: true,
    //     default: 0
    // },
    city: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    pincode: {
        type: Number,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    time: {
        type: Date,
        trim: true,
        required: true
    },
    
});

module.exports = mongoose.model('Events', EventsSchema);