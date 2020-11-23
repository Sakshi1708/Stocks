var express=require("express");
var router=express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var User = require("../models/user");
var stock = require("../models/stock");

router.get("/showall",(req,res)=>{
    res.render("stocks/showall");
});

router.get("/subscription",middleware.isloggedin,(req,res)=>{
    res.render("user/subscription");
});


module.exports = router;