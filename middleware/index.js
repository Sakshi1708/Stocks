var stock = require("../models/stock");
var User = require("../models/user");

var middleware={};

//login wala
middleware.isloggedin = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login to proceed");
    res.redirect("/register");
}


// user subscription free trial
middleware.subsfree = function(req,res,next){   
    if(req.isAuthenticated()){
            User.findById(req.params.id,function(err,founduser){
            if(err){
                console.log(err);
                req.flash("error", "Please buy subscription");
                res.redirect("/subscription");
            }
            else{
                if(founduser.id==(req.user.id)){
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


// user subscription three months
middleware.subsquatyear = function(req,res,next){   
    if(req.isAuthenticated()){
        if(User.subscription.brought==true){
            User.findById(req.params.id,function(err,substock){
                if(err){
                    console.log(err);
                    req.flash("error", "Please login to proceed");
                }
                else{
                    if(substock.author.id==(req.user.id)){
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
            req.flash("error", "Please Subscribe here to proceed");
                        res.redirect("redirect to page of subscription");
        }
    }
    else{
        req.flash("error", "Please login to proceed");
        res.redirect("/register");
    }       
}

// user subscription half yearly
middleware.subshalfyear = function(req,res,next){   
    if(req.isAuthenticated()){
        if(User.subscription.brought==true){
            User.findById(req.params.id,function(err,substock){
                if(err){
                    console.log(err);
                    req.flash("error", "Please login to proceed");
                }
                else{
                    if(substock.author.id==(req.user.id)){
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
            req.flash("error", "Please Subscribe here to proceed");
                        res.redirect("redirect to page of subscription");
        }
    }
    else{
        req.flash("error", "Please login to proceed");
        res.redirect("/register");
    }       
}
//user subscription yeary
middleware.subsyear = function(req,res,next){   
    if(req.isAuthenticated()){
        if(User.subscription.brought==true){
            User.findById(req.params.id,function(err,substock){
                if(err){
                    console.log(err);
                    req.flash("error", "Please login to proceed");
                }
                else{
                    if(substock.author.id==(req.user.id)){
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
            req.flash("error", "Please Subscribe here to proceed");
                        res.redirect("redirect to page of subscription");
        }
    }
    else{
        req.flash("error", "Please login to proceed");
        res.redirect("/register");
    }       
}


module.exports= middleware;