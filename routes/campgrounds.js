// var express=require("express");
// var router=express.Router({mergeParams: true});
// var campground=require("../models/campground");
// var middleware = require("../middleware/index");
// var mongoose=require("mongoose");
// // const user = require("../models/user");
// const doc = require("../models/comments");
// const unirest = require("unirest");

// var fs = require('fs'); 
// var path = require('path'); 
// var multer = require('multer'); 
// const options = require('dotenv/lib/env-options');
// const { all } = require(".");
// const { isNull } = require("util");
// require('dotenv/config'); 

// // var storage = multer.diskStorage({ 
// //     destination: (req, file, cb) => { 
// //         cb(null, 'uploads') ;
// //     }, 
// //     filename: (req, file, cb) => { 
// //         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) ;
// //     } 
// // }); 

// // var upload = multer({ storage: storage }); 

// ///routes for city
// router.get("/aboutus",function(req,res){
//     res.render("campgrounds/aboutus");
// });
// router.get("/privacy",function(req,res){
//     res.render("campgrounds/privacypolicy");
// });
// router.get("/terms",function(req,res){
//     res.render("campgrounds/terms");
// });

// router.get("/info",middleware.isloggedin,function(req,res){
//     res.render("campgrounds/city");
// })
// router.post("/info",function(req,res){
//     doc.find({},function(err,all){
//     var list=[];
//         all.forEach(function(single){
//             if(single.city==req.body.city && single.state==req.body.state){
//                 list.push(single);
//             }
//         })
//         if(list.length==0){
//             res.render("/campgrounds/nodoctor");
//         } else {
//         res.render("campgrounds/alldoctors",{doc_available:list});  
//         }      
//     })
// })


// //routes for doctor
// router.get("/campgrounds/collab",middleware.isloggedin,function(req,res){
//     res.render("campgrounds/doctor");
// })

// router.post("/campgrounds/collab", upload.array('myfiles',2),function(req,res){
//     var obj=[];
//         req.files.forEach(function(file){
//         console.log(file.filename);            
//         var xyz={ 
//             data: fs.readFileSync(path.join('./uploads/' + file.filename)), 
//         } ;
//         obj.push(xyz);
//       });
//         doc.create(req.body.doctor,function(err,doc_created){
//             doc_created.documents=obj;
//             doc_created.save();
//             console.log(doc_created);
//             res.redirect("/info");
//         })
// })
// //===================google map api
// router.get("/api",function(req,res){
//     res.render("campgrounds/api");
// })

// router.get("/api/:city/:state",function(req,res){
//     doc.find({},function(err,all){
//         var list=[];
//             all.forEach(function(single){
//                 if(single.city==req.params.city && single.state==req.params.state){
//                     list.push(single);
//                 }
//             })
//             if(list.length==0){
//                 res.render("campgrounds/nodoctor");
//             } else {
//             res.render("campgrounds/alldoctors",{doc_available:list});  
//             }      
//         })
// })

// //campground routes
// router.get("/campgrounds/final/:id",function(req,res){
//     campground.find({},function(err,allcampgrounds){
//         if(err){
//             req.flash("error", err);
//         } else{
//             allcampgrounds.forEach(function(got){
//                 if(got.btxn_id==""){
//                     console.log(got.name);
//                     campground.findByIdAndRemove(got._id,function(err){
//                         if(err){
//                             req.flash("error", err);
//                         }
//                         else{
//                             console.log("item deleted");
//                         }
//                     })    
//                 }
//             })
//             res.redirect("/campgrounds1/final/" +req.params.id);
//         }

//     })
// })

// router.get("/campgrounds1/final/:id",function(req,res){
//     campground.find({},function(err,allcampgrounds){
//         if(err){
//             req.flash("error", err);
//             res.redirect("/info");
//         } else{
//             campground.findById(req.params.id,function(err,mycamp){
//                 if(err){
//                     console.log(err);
//                     res.redirect("/info");
//                 } else {
//                     if(mycamp == null){
//                         res.redirect("/info");
//                     } else{
//                         var list=[];
//                         allcampgrounds.forEach(function(one){
//                             if(one.doctor_id == mycamp.doctor_id){
//                                 list.push(one);
//                             }
//                         })
    
//                         doc.findById(mycamp.doctor_id,function(err,doc){
//                             if(err){
//                                 console.log(err);
//                             } else {
//                         res.render("campgrounds/index",{campgrounds:list, currentuser: req.user, doc:doc});
//                             }
//                         })
    
//                     }

//                 }
//             })
            
//         }
//     })
// })
// //==================viewing
// router.get("/campgrounds/view/:id",function(req,res){
//     campground.find({},function(err,allcampgrounds){
//         if(err){
//             console.log(err);
//         } else {
//             var list = [];
//             allcampgrounds.forEach(function(single){
//                 if(single.doctor_id==req.params.id && single.btxn_id!=""){
//                     list.push(single);
//                 }
//             })
//             doc.findById(req.params.id,function(err,doc){
//                 if(err){
//                     console.log(err);
//                 } else {
//             res.render("campgrounds/index",{campgrounds:list, currentuser: req.user, doc:doc});
//                 }
//             })
//         }
//     })
// })

// // ==================================================new route
// router.get("/campgrounds/new/:id", middleware.isloggedin ,function(req,res){
//             res.render("campgrounds/new",{docid:req.params.id});
// })


// router.post("/campgrounds/:id", middleware.isloggedin ,function(req,res){
    
//     var myauthor={
//         id: req.user.id,
//         username: req.user.displayName,
//         image: req.user.photos[0].value,
//         gmailid:req.user.emails[0].value
//     };


//     campground.create(req.body.campground , function(err,camp){
//         if(err){
//             req.flash("error", err);
//         } else{
//             camp.author=myauthor;
//             // console.log(camp.author);
//             camp.btxn_id="";
//             camp.doctor_id=req.params.id;
//             camp.save();

//             // console.log("finally camp is: ");
//             // console.log(camp);

//             campground.find({},function(err,allcampgrounds){
//                 if(err){
//                     req.flash("error", err);
//                 } else{
//                     var list=[];
//                     allcampgrounds.forEach(function(one){
//                         if(one.doctor_id == camp.doctor_id){
//                             list.push(one);
//                         }
//                     });
//                     // console.log("finally list is : ");
//                     // console.log(list);
//                     res.render("campgrounds/slot",{camp: camp, allcamps: list});
//                 }
//             })
//         }
//     })
// })

// router.post("/campgrounds/:id/slot", middleware.isloggedin ,function(req,res){
//     campground.findById(req.params.id, function(err, foundcampground){
//         if(err){
//             req.flash("error", err);
//             res.redirect("/info");
//         }
//         else{
//             foundcampground.slot=req.body.slot;
//             foundcampground.save();
//             console.log(foundcampground);
//             if(req.user.emails[0].value.includes("@thapar.edu")){
//                 // console.log(req.user.emails[0].value);
//                 // console.log("thapar student");
//                 foundcampground.txn_id = "Free for thapar students";
//                 foundcampground.btxn_id = "thapar_discount";
//                 foundcampground.save();
//                 res.redirect("/campgrounds/" + foundcampground._id); 
//             }
//             else if(foundcampground.btxn_id == ""){
//             res.redirect("/campgrounds/" + req.params.id +"/payment");
//             } else {
//                 res.redirect("/campgrounds/" + foundcampground._id);
//             }
//         }
//     })
    
//     req.flash("success", "Your appointment request has been sent successfully. Thank you!");
    
// })

// // ===========================================show

// router.get("/campgrounds/:id",function(req,res){
//     campground.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
//         if(err){
//             req.flash("error", err);
//         }
//         else{
//             doc.findById(foundcampground.doctor_id,function(err,doc){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     // console.log(req.user.emails[0].value);
//                     // console.log(doc.email);
//                  res.render("campgrounds/show",{campground: foundcampground,doc: doc, usermail:req.user.emails[0].value} );
//                 }
//             })
//         }
//     })
// })

// // ==============================================edit
// router.get("/campgrounds/:id/edit", middleware.checkcampownership ,function(req,res){
//     campground.findById(req.params.id, function(err, foundcampground){
//         if(err){
//             req.flash("error", err);
//             res.redirect("/campgrounds");
//         }
//         else{
//             res.render("campgrounds/edit",{campground: foundcampground} );
//         }
//     })
// })

// router.put("/campgrounds/:id", middleware.checkcampownership ,function(req,res){
//     campground.findByIdAndUpdate(req.params.id,req.body.campground ,function(err, updatedcampground){
//         if(err){
//             req.flash("error", err);
//             res.redirect("/campgrounds");
//         }
//         else{
//             updatedcampground.save();
//             updatedcampground.slot="";
//             campground.find({},function(err,allcampgrounds){
//                 if(err){
//                     req.flash("error", err);
//                 } else{
//             res.render("campgrounds/slot",{camp: updatedcampground, allcamps: allcampgrounds});
//                 }
//             })
//         }
//     })
// })


// // ========================================delete
// router.delete("/campgrounds/:id", middleware.checkcampownership ,function(req,res){
//     campground.findByIdAndRemove(req.params.id ,function(err){
//         if(err){
//             req.flash("error", err);
//             res.redirect("/info");
//         }
//         else{
//             req.flash("success", "Appointment Successfully deleted");
//             res.redirect("/info");
//         }
//     })
// })

// module.exports = router;