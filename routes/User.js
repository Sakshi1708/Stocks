var express=require("express");
var router=express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var user = require("../models/user");
var stock = require("../models/stock");
const date = require('date-and-time');
const now = new Date();

const freetrialenddate = date.addDays(now, 5);

//free trial 5 din ka hai


router.get("/", function(req,res){
    res.redirect("stocks/showall",{stock:stock});
});
router.get("/adminportal",function(req,res){
    const next_month = date.addMonths(now, 1);
    const today=now;
    // const diff = date.subtract( next_month,today).toDays();
    today_refactored  = date.format(today, ' MMM DD YYYY');
    next_month_refactored =date.format(next_month, ' MMM DD YYYY');
    res.render("user/adminportal",{today:today_refactored,next_month:next_month_refactored});
});
router.get("/:id/tryfree",function(req,res){
user.find({"id":req.params.id},function(err,foundone){
    foundone.freetrial=true;
    foundone.Subscription.Price=0;
    foundone.Subscription.bought=true;
    foundone.SubscriptionDate.startdate.time.hour = date.format(now, 'H');
    foundone.SubscriptionDate.startdate.time.min = date.format(now, 'm');
    foundone.SubscriptionDate.startdate.time.timezone =  date.format(now, '[GMT]Z');
    foundone.SubscriptionDate.startdate.time.meridian = date.format(now, 'A');
    foundone.SubscriptionDate.startdate.day = date.format(now, 'dddd');
    foundone.SubscriptionDate.startdate.date = date.format(now, 'D');
    foundone.SubscriptionDate.startdate.month = date.format(now, 'M');
    foundone.SubscriptionDate.startdate.year = date.format(now, 'Y');
    foundone.SubscriptionDate.enddate.time.hour = date.format(freetrialenddate, 'H');
    foundone.SubscriptionDate.enddate.time.min = date.format(freetrialenddate, 'm');;
    foundone.SubscriptionDate.enddate.time.timezone = date.format(freetrialenddate, '[GMT]Z');;
    foundone.SubscriptionDate.enddate.time.meridian = date.format(freetrialenddate, 'A');;
    foundone.SubscriptionDate.enddate.day = date.format(freetrialenddate, 'dddd');;
    foundone.SubscriptionDate.enddate.date = date.format(freetrialenddate, 'D');;
    foundone.SubscriptionDate.enddate.month = date.format(freetrialenddate, 'M');;
    foundone.SubscriptionDate.enddate.year = date.format(freetrialenddate, 'Y');;
    foundone.save();

    res.render("stocks/freetrial",{user:foundone});
})

})

router.get("/subscription",middleware.isloggedin, function(req,res){
        res.render("user/subscription",{user:user});    
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
//         newuser.Admin=false;
//         newuser.freetrial=false;
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