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
            // user.find({},function(err,allusers){
            // if(err){
            //     console.log(err);
            //     req.flash("error", "Please buy subscription");
            //     res.redirect("/subscription");
            // }
            // else{
                user.findOne({id:req.user.id},(err,milgya)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(req.user.id," is subscribed");
                        console.log(milgya);
                        console.log(req.user.id," is subscribed");
                        var diff=date.subtract(now, milgya.SubscriptionDate.completeenddate).toDays();
                        console.log("days remaining",diff);
                        if(milgya.Subscription.bought==true && milgya.Subscription.Price>0 && diff<0){
                            console.log("is subscribed= true");
                            return next();
                        }
                        else{
                            req.flash("error", "Please Subscribe here to proceed");
                            res.redirect("/subscription");
                        }
                }});
                // var flag = 0;
                // var foundarray=[];
                // allusers.forEach(function(foundone){
                //     if(foundone.id==req.user.id){
                //         console.log("found user");
                //         foundarray.push(foundone);
                //     }
                // });
                //founduser = foundarray[0];
                //console.log(founduser);
            
            }
    //    })
        //}
    
    else{
        req.flash("error", "Please login to proceed");
        res.redirect("/register");
    }       
}
module.exports= middleware;