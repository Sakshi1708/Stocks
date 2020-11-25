var express=require("express");
var router=express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var user = require("../models/user");
var stock = require("../models/stock");


router.get("/login",function(req,res){
    res.render("user/login");
});
router.get("/admin",function(req,res){
    res.render("user/admin");
});

module.exports =router;