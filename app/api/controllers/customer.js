const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Models
const Customer= require("../model/customer")
const Event= require("../model/event")
const Ticket= require("../model/ticket");
const customer = require('../model/customer');
module.exports = {
    create: function(req,res,next){
        console.log(req.body);
        req.body.user.password =  bcrypt.hashSync(req.body.user.password, 10);
        Customer.create( req.body.user,function(err,userModel){
            if(err)
                next(err)
            else
            res.json({status: "success", message: "User added successfully!!!", data: null});
        })
    },

    authenticate: function(req,res,next){
        console.log(req.body);
        Customer.findOne({email:req.body.email},function(err,userModel){
            if (err || userModel==null) {
                // next(err);
                res.json({status:"error", message: "Invalid email/password!!!", data:err});
               } else {
                   console.log(userModel);
                //    console.log(userModel);
                    if(bcrypt.compareSync(req.body.password, userModel.password)) {
                    const token = jwt.sign({id: userModel._id,role:userModel.role}, 'secretkey', { expiresIn: '1h' });
                    res.json({status:"success", message: "user found!!!", data:{user: userModel, token:token}});
                    }else{
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                    }
               }
        })
    },
    registerEvent: function(req,res,next){
        Event.findById(req.params.id,function(err,event){
            if(err){
                res.json({status:"error", message: "Some error has occured 1", data:null});
            } else{
                Customer.findById(req.id,function(err,cus){
                    if(err){
                         res.json({status:"error", message: "Some error has occured 2", data:null});
                    } else{
                        if(cus.events.includes(event._id)){
                           res.json({status:"error", message: "Already Registered!!!"});
                        } else{
                            Ticket.create({"event":event._id,"customer":cus._id},function(err,ticket){
                                if(err){
                                    res.json({status:"error", message: "Some error has occured 1", data:null});
                                } else{
                                    event.customers.push(cus._id);
                                    event.tickets.push(ticket._id);
                                    event.save();
                                    cus.events.push(event._id);
                                    cus.tickets.push(ticket._id);
                                    cus.save();
                                    res.json({status:"success", message: "Event Registered!!!", data: cus});
                                }
                            })
                        }
                      
                    }
                })
            }
        })
    },
    viewEvents:function(req,res,next){
        Event.find({},function(err,events){
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                res.json({status:"success", message: "Events Details", data:events});
            }
        })
    },


}