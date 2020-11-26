var express=require("express");
var router=express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var user = require("../models/user");
var stock = require("../models/stock");

router.get("/", function(req,res){
    res.redirect("stocks/showall",{stock:stock});
});

router.get("/subscription",middleware.isloggedin, function(req,res){
    user.find({},function(err,founduser){
        res.render("user/subscription",{user:user});
    })
    
});

router.get("/", (req,res)=>{
    res.redirect("stocks/showall",{stock:stock});
});

router.get("/login",function(req,res){
    res.render("user/login");
});
router.get("/admin",function(req,res){
    res.render("user/admin");
});
router.get("/signup", function(req,res){
    res.render("user/signup");
});
// router.post("/signup", function(req,res){
//     const newuser =new user();
//     newuser.FirstName = req.body.FirstName;
//     newuser.LastName = req.body.LastName;
//     newuser.EmailId = req.body.EmailId;
//     newuser.PhoneNo  = "7009734327";
//     newuser.Password= req.body.Password;
        // newuser.Admin=false;
        // newuser.freetrial=false;
// newuser.save();
//     res.render("user/signup");
// });
router.post("/signup", function(req,res){
    const newuser =new user();
    newuser.FirstName = "";
    newuser.LastName = "req.body.LastName";
    newuser.EmailId = "req.body.EmailId";
    newuser.PhoneNo  = "7009734327";
    newuser.Password= "req.body.Password";
    newuser.Subscription.bought=false;
    newuser.Admin=true;
    newuser.freetrial=true;
    newuser.save();

    res.render("partials/home");


});

// FirstName: String,
// LastName : String,
// PhoneNo : Number,
// EmailId : String,
// Password : String,
// Subscription : {
// bought: Boolean,
// Price : Number    
// }, 
// PostDate:{
//     startdate: Date,
//     enddate:Date
// },
// Admin : Boolean,
// //freetrial
// freetrial: Boolean,

module.exports =router;