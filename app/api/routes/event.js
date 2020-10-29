  
var router = require("express").Router();

//Controllers
const eventController = require('../controllers/event');

//Middleware
const middleware = require("../middleware")

router.post("/event/",middleware.verifytoken,eventController.create);
router.get("/event/:eventid",middleware.verifytoken,eventController.showEvent);
router.get("/event/:id/customers",middleware.verifytoken,eventController.showCustomers)
router.get("/events",middleware.verifytoken,eventController.showEvents);
router.put("/event/:eventid",middleware.verifytoken,eventController.updateEvent);
router.delete("/event/:eventid",middleware.verifytoken,eventController.deleteEvent);

module.exports = router;