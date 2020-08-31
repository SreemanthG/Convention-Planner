var express = require("express");
var mongoose = require("mongoose");
var app = express();

mongoose.connect("mongodb://localhost/ConventionPlannerDemo");

app.get("/",function(req,res){
    res.send("Hello");
})

var PORT = process.env.PORT||3000;
app.listen(PORT, function(){
    console.log("App Started listening at "+ PORT)
})