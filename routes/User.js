var express=require("express");
var router=express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var user = require("../models/user");
var stock = require("../models/stock");

router.get("/", (req,res)=>{
    res.redirect("stocks/showall",{stock:stock});
});

router.get("/subscription", (req,res)=>{
    res.redirect("user/subscription",{user});
});

router.get("/", (req,res)=>{
    res.redirect("stocks/showall",{stock:stock});
});


module.exports =router;