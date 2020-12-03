var express = require("express");
var passport = require("passport");
var mongoose = require("mongoose");
require('dotenv').config();

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var router = express.Router({
    mergeParams: true
});
var user = require("../models/user");
var stock = require("../models/stock");
const date = require('date-and-time');
const now = new Date();
passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3001/google/callback",
        //callbackURL: "https://avinashjindal2510.herokuapp.com/google/callback",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        //console.log(profile);
        //console.log(profile._json);
        return done(null, profile);
    }
));
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

router.get("/", function (req, res) {
    res.render("partials/home");
})

router.get("/register", function (req, res) {
    res.render("auth_files/register");
})

router.get("/google", passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get("/google/callback", passport.authenticate('google', {
    failureRedirect: "/register"
}), function (req, res) {
    res.redirect("/success");
})

router.get("/success", function (req, res) {
            // req.flash("success", "Welcome!!! you are successfully Logged In as " + req.user.displayName);
            console.log("hi");
            console.log("=======================================");
            console.log(req.user);
            console.log("=======================================");
            console.log(req.user.id);
            console.log("=======================================");

            user.find({
                    "id": req.user._json.sub
                }, function (err, founduser) {

                    console.log("condition 0 found user");
                    console.log(founduser);
                    console.log("condition 0 finished");

                    if (err) {
                        console.log("Error raised");
                        console.log(err);
                    } else {
                        if (founduser.length==0) {
                            var newuser = new user();
                            newuser.FullName = req.user._json.name;
                            newuser.FirstName = req.user._json.given_name;
                            newuser.LastName = req.user._json.family_name;
                            newuser.EmailId = req.user._json.email;
                            newuser.PhoneNo = -1;
                            newuser.Password = "1234";
                            newuser.Admin = false;
                            newuser.freetrial = false;
                            newuser.Subscription.bought = false;
                            newuser.Subscription.Price = -1;
                            newuser.id = req.user._json.sub;
                            newuser.Signup.day = date.format(now, 'dddd');
                            newuser.Signup.date = date.format(now, 'D');
                            newuser.Signup.month = date.format(now, 'M');
                            newuser.Signup.year = date.format(now, 'Y');
                            newuser.Signup.time.hour = date.format(now, 'H');
                            newuser.Signup.time.min = date.format(now, 'm');
                            newuser.Signup.time.timezone = date.format(now, '[GMT]Z');
                            newuser.Signup.time.meridian = date.format(now, 'A');
                            newuser.SubscriptionDate.startdate.time.hour = "";
                            newuser.SubscriptionDate.startdate.time.min = "";
                            newuser.SubscriptionDate.startdate.time.timezone = "";
                            newuser.SubscriptionDate.startdate.time.meridian = "";
                            newuser.SubscriptionDate.startdate.day = "";
                            newuser.SubscriptionDate.startdate.date = 0;
                            newuser.SubscriptionDate.startdate.month = 0;
                            newuser.SubscriptionDate.startdate.year = 0;
                            newuser.SubscriptionDate.enddate.time.hour = "";
                            newuser.SubscriptionDate.enddate.time.min = "";
                            newuser.SubscriptionDate.enddate.time.timezone = "";
                            newuser.SubscriptionDate.enddate.time.meridian = "";
                            newuser.SubscriptionDate.enddate.day = "";
                            newuser.SubscriptionDate.enddate.date = 0;
                            newuser.SubscriptionDate.enddate.month = 0;
                            newuser.SubscriptionDate.enddate.year = 0;
                            newuser.SubscriptionDate.completeenddate = 0;
                            
                            newuser.save();
                            console.log("condition 2");
                            res.render("partials/home", {
                                user: newuser
                            });
                        } else {
                            console.log("existing user found");
                            res.render("partials/home", {
                                user: founduser
                            });
                        }
                    }







                })
            });


        router.get("/logout", function (req, res) {
            req.flash("success", "Thank you!!! you are successfully Logged Out");
            req.logOut();
            res.redirect("/");
        });

        module.exports = router;