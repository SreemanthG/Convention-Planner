const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const TicketSchema = new Schema({
   
    event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Events",
    trim: true,
    required: true
   },
    customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
    trim: true,
    required: true
    },
    });
// hash user password before saving into database
// UserSchema.pre('save', function(next){
// this.password = bcrypt.hashSync(this.password, saltRounds);
// next();
// });
module.exports = mongoose.model('Tickets', TicketSchema);