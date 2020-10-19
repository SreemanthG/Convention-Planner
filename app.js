
var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose =require("mongoose");
var bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
var app = express();

//Routes
const authRoutes = require("./app/api/routes/auth")
const eventRoutes = require("./app/api/routes/event")

mongoose.connect("mongodb://localhost/ConventionPlannerDemo");
app.use(methodOverride('_method'));

app.use(express.static(__dirname+"/public"));
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


var PORT = process.env.PORT||3000;
app.listen(PORT, function(){
    console.log("App Started listening at "+ PORT)
})