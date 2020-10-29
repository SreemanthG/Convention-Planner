    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    //Define a schema
    const Schema = mongoose.Schema;
    const CustomerSchema = new Schema({
        name: {
        type: String,
        trim: true,  
        required: true,
        },
        email: {
        type: String,
        trim: true,
        required: true
        },
        password: {
        type: String,
        trim: true,
        required: true
        },
        events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events",
        trim: true,
        }],
        number: {
        type: Number,
        trim: true,
        required: true
        },  
        role:{
            type:Number,
            trim:true,
            default:1
        },
        tickets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tickets",
            trim: true,
       }],
        });
    // hash user password before saving into database
    // UserSchema.pre('save', function(next){
    // this.password = bcrypt.hashSync(this.password, saltRounds);
    // next();
    // });
    module.exports = mongoose.model('Customers', CustomerSchema);