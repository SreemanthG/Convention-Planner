//Models
const User= require("../model/user")
const Event= require("../model/event")


module.exports = {
    create: function(req,res,next){
        User.findById(req.id,function(err,user){
            if(err || user==null){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                Event.create(req.body,function(err,event){
                    if(err){
                        res.json({status:"error", message: "Some Error has occured "+err, data:null});
                    } else{
                            user.events.push(event._id)
                            user.save();
                            res.json({status:"success", message: "Events added successfully!!", data:event});
                        }
                })
            }
        })
    },
    showEvent:function(req,res,next){
        User.findById(req.id,function(err,user){
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                console.log(req.params.eventid in user.events);
                if(user.events.includes(req.params.eventid)){
                    Event.findById(req.params.eventid,function(err,event){
                        if(err){
                            res.json({status:"error", message: "Some Error has occured "+err, data:null});
                        } else if(event==null){
                            res.json({status:"error", message: "No event found", data:null});
                        }else{
                            res.json({status:"success", message: "Event Details", data:event});
                        }
                    })
                } else{
                    res.send(403)
                }
            }
        })
        
    },
    updateEvent:function(req,res,next){
        User.findById(req.id,function(err,user){
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                if(user.events.includes(req.params.eventid)){
                    Event.findByIdAndUpdate(req.params.eventid,req.body, {new: true},function(err,event){
                        if(err){
                            res.json({status:"error", message: "Some Error has occured "+err, data:null});
                        } else{
                            res.json({status:"success", message: "Event Updated Details", data:event});
                        }
                    })
                } else{
                    res.send(403)
                }
            }
        })
       
    },
    deleteEvent:function(req,res,next){
        User.findById(req.id,function(err,user){
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                if(user.events.includes(req.params.eventid)){
                    Event.findByIdAndRemove(req.params.eventid,function(err,event){
                        if(err){
                            res.json({status:"error", message: "Some Error has occured "+err, data:null});
                        } else{
                            res.json({status:"success", message: "Event Deleted", data:event});
                        }
                    })
                } else{
                    res.send(403)
                }
            }
        })
        
    },
    showEvents:function(req,res,next){
        User.findById(req.id).populate({ 
            path: 'events',
            populate: {
              path: 'transactions',
              model: 'Transactions'
            } 
         }).exec(function(err,user){
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                res.json({status:"success", message: "Events Details", data:user.events});
            }
        })
    },
    showCustomers:function(req,res){
        Event.findById(req.params.id).populate('customers').exec(function(err,event){
            if(err){
                res.json({status:"error", message: "Some error has occured "+err});
            } else{
                res.json({status:"success", message: "Event Participants!!!", data: event.customers});
        
            }
        })
    }
}