
const jwt = require('jsonwebtoken');

module.exports = {
    verifytoken: function(req,res,next){
        const bearerHeader = req.headers["authorization"];
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(" ")[1];
            req.token = bearer;
            jwt.verify(req.token,'secretkey',function(err,authData){
                        if(!err && authData.role==0){
                            req.id = authData.id;
                            // console.log(authData);
                            next();
                        } else{
                            res.sendStatus(403);
                        }
                    })
            // next(); 
        } else{
            res.sendStatus(403)
        }
    },
    verifyCustomer: function(req,res,next){
        const bearerHeader = req.headers["authorization"];
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(" ")[1];
            req.token = bearer;
            jwt.verify(req.token,'secretkey',function(err,authData){
                        if(!err && authData.role==1){
                            req.id = authData.id;
                            // console.log(authData);
                            next();
                        } else{
                            res.sendStatus(403);
                        }
                    })
            // next(); 
        } else{
            res.sendStatus(403)
        }
    }
}