var express=require("express");
var passport=require("passport");
require('dotenv').config();

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var router=express.Router({mergeParams: true});
var user=require("../models/user");
var stock=require("../models/stock");
const date = require('date-and-time');
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
     callbackURL: "http://localhost:3001/google/callback",
    //callbackURL: "https://avinashjindal2510.herokuapp.com/google/callback",
    passReqToCallback: true
  },
  function(request,accessToken, refreshToken, profile, done) {
        //console.log(profile);
        //console.log(profile._json);
        return done(null,profile);
  }
));
passport.serializeUser(function(user,done){
    done(null,user);
});
passport.deserializeUser(function(user,done){
    done(null,user);
});

router.get("/",function(req,res){
    res.render("partials/home");
})

router.get("/register", function(req,res){
    res.render("auth_files/register");
})

router.get("/google", passport.authenticate('google',{scope:['profile','email']}));

router.get("/google/callback",passport.authenticate('google',
{failureRedirect:"/register"}),function(req,res){
    res.redirect("/success");
})

router.get("/success",function(req,res){
   // req.flash("success", "Welcome!!! you are successfully Logged In as " + req.user.displayName);
    console.log("hi");
    console.log("=======================================");
    console.log(req.user);
    console.log("=======================================");
    console.log(req.user.id);
    console.log("=======================================");
    user.find({},function(err,founduser){
        console.log(founduser);
        if(err){
            console.log(err);
        }
        if(!founduser)
        {
            
                const newuser =new user();
                newuser.FirstName = req.user._json.name;
                newuser.LastName = req.user.LastName;
                newuser.EmailId = req.user.EmailId;
                newuser.PhoneNo  = -1 ;
                newuser.Password= "1234";
                newuser.Admin=false;
                newuser.freetrial=false;
                newuser.Emailid=req.user;
                newuser.Subscription.bought=false;
                newuser.Subscription.Price=-1;
                newuser.id=req.user._json.sub;
                newuser.Subscription.bought=false;
                newuser.Subscription.price=req.params.price;
                newuser.PostDate.startdate= new Date.now();
                newuser.Signup.day=date.format(now, 'dddd');
                newuser.Signup.date=date.format(now, 'D');
                newuser.Signup.month=date.format(now, 'M');
                newuser.Signup.year=date.format(now, 'Y');
                newuser.Signup.time.hour=date.format(now, 'H');
                newuser.Signup.time.min=date.format(now, 'm');
                newuser.Signup.time.timezone=date.format(now, '[GMT]Z');
                newuser.Signup.time.meridian=date.format(now, 'A');
                newuser.save();
                res.render("user/subscription",{user:newuser});
            
        }
     
        if(founduser)
        {
            founduser.forEach(function(foundOne){
                if(foundOne.id==req.user._json.sub){
                    res.render("user/subscription",{user:foundOne});
                }
            })
            const newuser =new user();
            newuser.FullName     =          req.user._json.name;
            newuser.FirstName =             req.user._json.given_name;
            newuser.LastName =              req.user._json.family_name;
            newuser.EmailId =               req.user._json.email;
            newuser.PhoneNo  =              -1 ;
            newuser.Password=               "1234";
            newuser.Admin=                  false;
            newuser.freetrial=              false;
            newuser.Subscription.bought=    false;
            newuser.Subscription.Price=     -1;
            newuser.id=                     req.user._json.sub;
            newuser.Signup.day=             date.format(now, 'dddd');
            newuser.Signup.date=            date.format(now, 'D');
            newuser.Signup.month=           date.format(now, 'M');
            newuser.Signup.year=            date.format(now, 'Y');
            newuser.Signup.time.hour=       date.format(now, 'H');
            newuser.Signup.time.min=        date.format(now, 'm');
            newuser.Signup.time.timezone=   date.format(now, '[GMT]Z');
            newuser.Signup.time.meridian=   date.format(now, 'A');
            newuser.save();
            res.render("user/subscription",{user:newuser});
        }


        
    })   
 });


router.get("/logout",function(req,res){
    req.flash("success", "Thank you!!! you are successfully Logged Out");
    req.logOut();
    res.redirect("/info");
})

module.exports = router;