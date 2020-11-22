var campground=require("../models/campground");
var Comment=require("../models/comments");

var middlewareobj={};

middlewareobj.isloggedin = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login to proceed");
    res.redirect("/register");
}

middlewareobj.checkcampownership=function (req,res,next){
    if(req.isAuthenticated()){
        campground.findById(req.params.id, function(err,foundcampground){
            if(err){
                req.flash("error", "Something went wrong");
                res.redirect("back");
            } else {
                if(foundcampground.author.id==(req.user.id)){
                    return next();
                }
                else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back")
                }
            }
        })
    } else {
        req.flash("error", "Please login to proceed");
        res.redirect("back")
    }
}


middlewareobj.checkcommentownership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err,foundcomment){
            if(err){
                req.flash("error", "Something went wrong");
                res.redirect("back");
            } else {
                if(foundcomment.author.id==(req.user.id)){
                    return next();
                }
                else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back")
                }
            }
        })
    } else {
        req.flash("error", "Please login to proceed");
        res.redirect("back")
    }
}

module.exports=middlewareobj;