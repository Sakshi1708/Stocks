var stock = require("../models/stock");
var User = require("../models/user");
const date = require('date-and-time');

var now = new Date();

var middleware={};

//local auth
middleware.localauth= function(req,res,next){

}


//login wala
middleware.isloggedin = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login to proceed");
    res.redirect("/register");
}


// user subscription free trial
middleware.issubscribed = function(req,res,next){   
    if(req.isAuthenticated()){
            User.find({"id":req.user.id},function(err,founduser){
            if(err){
                console.log(err);
                req.flash("error", "Please buy subscription");
                res.redirect("/subscription");
            }
            else{
                var diff=date.subtract(now, founduser.SubscriptionDate.completeenddate).toDays();
                console.log("days remaining",diff);
                if(founduser.Subscription.bought==true && founduser.Subscription.price>0 && diff<0){
                    return next();
                }
                else{
                    req.flash("error", "Please Subscribe here to proceed");
                    res.redirect("/subscription");
                }
            }
        })
    
    }
    else{
        req.flash("error", "Please login to proceed");
        res.redirect("/register");
    }       
}



module.exports= middleware;