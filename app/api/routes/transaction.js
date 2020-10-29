  
var router = require("express").Router();

//Controllers
const transactionController = require('../controllers/transaction');

//Middleware
const middleware = require("../middleware")

router.post("/event/:eventid/transaction/",middleware.verifytoken,transactionController.create);
router.get("/transaction/:tid",middleware.verifytoken,transactionController.showTransaction);
router.get("/transactions",middleware.verifytoken,transactionController.dashboardTransactions);
router.get("/event/:eventid/transactions",middleware.verifytoken,transactionController.showTransactions);
router.put("/transaction/:tid",middleware.verifytoken,transactionController.updateTransaction);
router.delete("/transaction/:tid",middleware.verifytoken,transactionController.deleteTransaction);

module.exports = router;