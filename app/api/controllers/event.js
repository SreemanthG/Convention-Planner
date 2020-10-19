//Models
const User= require("../model/user")
const Event= require("../model/event")


module.exports = {
    create: function(req,res,next){
        User.findById(req.id,function(err,user){
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                Event.create(req.body,function(err,event){
                    if(err){
                        res.json({status:"error", message: "Some Error has occured "+err, data:null});
                    } else{
                            user.events.push(event._id)
                            user.save();
                            res.json({status:"success", message: "Events added successfully!!", data:user});
                        }
                })
            }
        })
    },
    showEvent:function(req,res,next){
        Event.findById(req.params.eventid,function(err,event){
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else if(event==null){
                res.json({status:"error", message: "No event found", data:null});
            }else{
                res.json({status:"success", message: "Event Details", data:event});
            }
        })
    },
    updateEvent:function(req,res,next){
        Event.findByIdAndUpdate(req.params.eventid,req.body, {new: true},function(err,event){
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                res.json({status:"success", message: "Event Updated Details", data:event});
            }
        })
    },
    deleteEvent:function(req,res,next){
        Event.findByIdAndRemove(req.params.eventid,req.body,function(err,event){
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                res.json({status:"success", message: "Event Deleted", data:event});
            }
        })
    },
    showEvents:function(req,res,next){
        Event.find({},function(err,events){
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                res.json({status:"success", message: "Events Details", data:events});
            }
        })
    }
}