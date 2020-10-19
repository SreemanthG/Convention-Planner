  
var router = require("express").Router();
const jwt = require('jsonwebtoken');

//Controllers
const authController = require('../controllers/auth');

//Middleware
const middleware = require("../middleware")

router.post("/signup",authController.create);
router.post("/login",authController.authenticate)
router.get("/protected",middleware.verifytoken,function(req,res){
    res.json({id:req.id,status:"successfull"});
})

module.exports = router;