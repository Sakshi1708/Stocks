var express=require("express");
var router=express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var User = require("../models/user");
var stock = require("../models/stock");

router.get("/",(req,res)=>{
    res.redirect("stocks/showall");
});



module.exports =router;