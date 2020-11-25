var express=require("express");
var router=express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var user = require("../models/user");
var stock = require("../models/stock");

<<<<<<< HEAD
router.get("/", (req,res)=>{
    res.redirect("stocks/showall",{stock:stock});
});

router.get("/subscription", (req,res)=>{
    res.redirect("user/subscription",{user});
});

router.get("/", (req,res)=>{
    res.redirect("stocks/showall",{stock:stock});
});
=======
>>>>>>> 2ed2c870f1d8f5acfaac602010b790b06574b685

router.get("/login",function(req,res){
    res.render("user/login");
});
router.get("/admin",function(req,res){
    res.render("user/admin");
});

module.exports =router;