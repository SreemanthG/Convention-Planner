
var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose =require("mongoose");
var bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const cors = require("cors")
var app = express();

app.use(cors())
//Routes
const authRoutes = require("./app/api/routes/auth")
const eventRoutes = require("./app/api/routes/event")
const transactionRoutes = require("./app/api/routes/transaction")
const customerRoutes = require("./app/api/routes/customer")

mongoose.connect("mongodb://localhost/ConventionPlanner");
app.use(methodOverride('_method'));

app.use(express.static(__dirname+"/public"));
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req,res,next){
    res.locals.id=req.id;
    next();
})

app.get("/",function(req,res){
    res.send("Hello");
})

app.use(authRoutes);
app.use(eventRoutes);
app.use(transactionRoutes);
app.use(customerRoutes);


var PORT = process.env.PORT||5000;
app.listen(PORT, function(){
    console.log("App Started listening at "+ PORT)
})