var express=require("express");
var router=express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var mongoose=require("mongoose");
var user = require("../models/user");
var stock = require("../models/stock");

router.get("/",function(req,res){
    stock.find({},function(allstocks,err){
        if(err)
        {
            console.log("errorehbjhbvhsfbihesfbhs")
            console.log(err);
        }
        else{
            console.log("hi");
            console.log(allstocks);
        res.render("stocks/showall",{stock:allstocks});
        }
    })
});

router.get("/subscription",middleware.isloggedin,(req,res)=>{
    res.render("user/subscription");
});


module.exports = router;