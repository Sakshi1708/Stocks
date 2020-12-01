var stock = require("../models/stock");
var user = require("../models/user");
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
            user.find({},function(err,allusers){
            if(err){
                console.log(err);
                req.flash("error", "Please buy subscription");
                res.redirect("/subscription");
            }

            else{
                var flag = 0;
                var foundarray=[];
                allusers.forEach(function(foundone){
                    if(foundone.id==req.user.id){
                        console.log("found user");
                        foundarray.push(foundone);
                    }
                });
                founduser = foundarray[0];
                console.log(founduser);
                var diff=date.subtract(now, founduser.SubscriptionDate.completeenddate).toDays();
                console.log("days remaining",diff);
                if(founduser.Subscription.bought==true && founduser.Subscription.Price>0 && diff<0){
                    console.log("is subscribed= true");
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