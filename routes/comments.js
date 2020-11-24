var express=require("express");
var router=express.Router({mergeParams: true});
var campground=require("../models/campground");
var Comment=require("../models/comments");
var middleware = require("../middleware/index");

router.get("/campgrounds/:id/comments/new", middleware.isloggedin ,function(req,res){
    campground.findById((req.params.id),function(err, foundcampground){
        if(err){
            req.flash("error", err);
        }
        else{
            res.render("comments/new",{campground: foundcampground});
        }
    })
})

router.post("/campgrounds/:id/comments", middleware.isloggedin ,function(req,res){
    campground.findById((req.params.id),function(err, foundcampground){
        if(err){
            req.flash("error", err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment, function(err,commentcreated){
                if(err){
                    req.flash("error", err);
                } else {

                    commentcreated.author.id=req.user._id;
                    commentcreated.author.username=req.user.username;
                    commentcreated.save();

                    foundcampground.comments.push(commentcreated);
                    foundcampground.save();
                    req.flash("success", "Successfully comment is created");
                    res.redirect("/campgrounds/" + foundcampground._id);
                }
            })
        }
    })
})
//////////////////////////////////////////////////////////////////////////////////////////

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkcommentownership ,function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundcomment){
        if(err){
            req.flash("error", err);
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{comment: foundcomment, campground_id: req.params.id} );
        }
    })
})

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkcommentownership ,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment ,function(err, updatedcomment){
        if(err){
            req.flash("error", err);
        }
        else{
            req.flash("success", "Successfully comment is updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkcommentownership ,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id ,function(err){
        if(err){
            req.flash("error", err);
            res.redirect("back");
        }
        else{
            req.flash("success", "Successfully comment is deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

module.exports = router;
