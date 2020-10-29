var mongoose = require('mongoose'); 
//Models
const User= require("../model/user")
const Event= require("../model/event")
const Transaction= require("../model/transaction");
const e = require('express');

module.exports = {
    create: function(req,res,next){

        User.findById(req.id,function(err,user){
            eventid = req.params.eventid
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                if(user.events.includes(eventid)){
                    Event.findById(eventid,function(err,event){
                        if(err){
                            res.json({status:"error", message: "Some Error has occured "+err, data:null});
                        } else{
                            Transaction.create(req.body,function(err,transaction){
                                if(err || transaction == null){
                                    res.json({status:"error", message: "Some Error has occured "+err, data:null});
                                } else{
                                    user.budget = user.budget-transaction.amount
                                    user.save();
                                    transaction.user=user._id
                                    transaction.save()
                                    event.transactions.push(transaction._id)
                                    event.save();
                                    res.json({status:"success", message: "Transaction added successfully!!", data:event});
    
                                }
                            })
                        }
                        })
                } else{
                    res.sendStatus(403)
                }
                
            }
        })
    },
    showTransaction:function(req,res,next){
        Transaction.findByIdAndRemove(req.params.tid,function(err,transaction){
            if(err || transaction.user!=req.id){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                res.json({status:"success", message: "Transaction Details", data:transaction});
            }
        })
      
    },
    updateTransaction:function(req,res,next){
        Transaction.findByIdAndUpdate(req.params.tid,req.body, {new: true},function(err,transaction){
            if(err || transaction.user!=req.id){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                res.json({status:"success", message: "Transaction Updated Details", data:transaction});
            }
        })
    },
    deleteTransaction:function(req,res,next){
        Transaction.findByIdAndRemove(req.params.eventid,req.body,function(err,event){
            if(err || transaction.user!=req.id){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                res.json({status:"success", message: "Transaction- Deleted", data:event});
            }
        })
    },
    showTransactions:function(req,res,next){
        User.findById(req.id,function(err,user){
            eventid = req.params.eventid
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                if(user.events.includes(eventid)){
                    Event.findById(req.params.eventid).populate("transactions").exec(function(err,event){
                        if(err){
                            res.json({status:"error", message: "Some Error has occured "+err, data:null});
                        } else{
                            res.json({status:"success", message: "Transactions Details", data:event.transactions});
                        }
                    })
                } else{
                    res.sendStatus(403)
                }
                
            }
        })
        
    },
    dashboardTransactions:function(req,res,next){

        Transaction.find({"user":req.id}).sort({timestamp:-1}).limit(Number(req.query["offset"])).exec(function(err,transactions){
            if(err){
                res.json({status:"error", message: "Some Error has occured "+err, data:null});
            } else{
                res.json({status:"success", message: "Transactions", data:transactions});
            }
        })
    }
}