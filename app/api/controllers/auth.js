const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Models
const User= require("../model/user")
module.exports = {
    create: function(req,res,next){
        console.log(req.body);
        req.body.user.password =  bcrypt.hashSync(req.body.user.password, 10);
        User.create( req.body.user,function(err,userModel){
            if(err)
                next(err)
            else
            res.json({status: "success", message: "User added successfully!!!", data: null});
        })
    },


    authenticate: function(req,res,next){
        User.findOne({email:req.body.email},function(err,userModel){
            if (err || userModel==null) {
                // next(err);
                res.json({status:"error", message: "Invalid email/password!!!", data:err});
               } else {
                   console.log(userModel);
                //    console.log(userModel);
                    if(bcrypt.compareSync(req.body.password, userModel.password)) {
                    const token = jwt.sign({id: userModel._id}, 'secretkey', { expiresIn: '1m' });
                    res.json({status:"success", message: "user found!!!", data:{user: userModel, token:token}});
                    }else{
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                    }
               }
        })
    }
}