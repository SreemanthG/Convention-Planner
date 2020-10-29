  
var router = require("express").Router();

//Controllers
const customerController = require('../controllers/customer');

//Middleware
const middleware = require("../middleware")

router.post("/cus/signup",customerController.create);
router.post("/cus/login",customerController.authenticate)
router.post("/cus/:id/register",middleware.verifyCustomer,customerController.registerEvent)
router.get("/cus/events",middleware.verifyCustomer,customerController.viewEvents)
router.get("/cus/protected",middleware.verifyCustomer,function(req,res){
    res.json({id:req.id,status:"successfull"});
})

module.exports = router;