var mongoose = require("mongoose");


const Schema = mongoose.Schema;
const TransactionsSchema = new Schema({
    name: {
        type: String,
        trim: true,  
        required: true,
    },
    amount: {
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
    },
    timestamp: {
        type: Date,
        trim: true,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }
});

module.exports = mongoose.model('Transactions', TransactionsSchema);