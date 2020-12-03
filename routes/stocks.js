var express=require("express");
var router=express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var user = require("../models/user");
var stock = require("../models/stock");
const date = require('date-and-time');
const { isloggedin } = require("../middleware/index");
router.get("/admin/todaytop",middleware.isadmin,function(req,res){
    stock.find({},function(err,allstocks){
        // var flag=0;
        // var alladmin=[];
        // user.findOne({id: req.user._json.sub}, function (err, founduser) {
        //     // console.log("condition 0 found user");
        //     // console.log(founduser);
        //     // console.log("condition 0 finished");
        //     if (err) {
        //         console.log("Error raised");
        //         console.log(err);
        //     } else {
        // if(founduser[0].Admin==true){
        //     console.log("condition 0 found admin");
        //     console.log(founduser);
        //     console.log("condition 0 finished");
        //     flag=99999;
        // }
     
        // console.log(stockcreated);
        res.render("stocks/showall",{stock:allstocks,flag:flag});
    })
      });
router.get("/todaytop",middleware.issubscribed,function(req,res){
    stock.find({},function(err,allstocks){
        // console.log(stockcreated);
        res.render("stocks/showall",{stock:allstocks,flag:0});
    });
     });
router.get("/admin/showall",middleware.isadmin,function(req,res){
    stock.find({},function(err,allstocks){
        // user.find({"id": req.user._json.sub}, function (err, founduser) {

            // console.log("condition 0 found user");
            // console.log(founduser);
            // console.log("condition 0 finished");

            // if (err) {
            //     console.log("Error raised");
            //     console.log(err);
            // } else {
        // if(founduser[0].Admin==true){
        //     console.log("condition 0 found admin");
        //     console.log(founduser);
        //     console.log("condition 0 finished");
        //     flag=99999;
        // }
    
        // console.log(stockcreated);
        res.render("stocks/showall",{stock:allstocks,flag:10});
    })
   })
router.get("/showall",middleware.issubscribed,function(req,res){
            stock.find({},function(err,allstocks){
                // var flag=0;
                // var alladmin=[];
                // user.find({"id": req.user._json.sub}, function (err, founduser) {

                //     // console.log("condition 0 found user");
                //     // console.log(founduser);
                //     // console.log("condition 0 finished");

                //     if (err) {
                //         console.log("Error raised");
                //         console.log(err);
                //     } else {
                // if(founduser[0].Admin==true){
                //     console.log("condition 0 found admin");
                //     console.log(founduser);
                //     console.log("condition 0 finished");
                //     flag=99999;
                // }
            
                // console.log(stockcreated);
                res.render("stocks/showall",{stock:allstocks,flag:0});
            });
              });
router.get("/admin/create",middleware.isadmin,function(req,res){
    res.render("stocks/createstock");
});
router.get('/showall/delete/:_id',middleware.isadmin,function(req,res){
    stock.findByIdAndRemove(req.params._id,function(err,doc){
        if(err){
            console.log(err);
        }
        else{
            // console.log("success",doc);

            // stock.find({},function(err,allstocks){
            //     var flag=0;
            //     var alladmin=[];
            //     user.find({"id": req.user._json.sub}, function (err, founduser) {

            //         console.log("condition 0 found user");
            //         console.log(founduser);
            //         console.log("condition 0 finished");

            //         if (err) {
            //             console.log("Error raised");
            //             console.log(err);
            //         } else {
            //     if(founduser[0].Admin==true){
            //         console.log("condition 0 found admin");
            //         console.log(founduser);
            //         console.log("condition 0 finished");
            //         flag=99999;
            //     }
            
                // console.log(stockcreated);
                // res.render("stocks/showall",{stock:allstocks,flag:flag});
                res.redirect("/showall");
            }
              })
        
        })
router.post("/admin/create", function(req,res){
    console.log(req.body);
    const today=new Date();
    const next_month = date.addMonths(today, 1);
    var newstock = new stock();
    newstock.StockName = req.body.stockname;
    newstock.exchange =req.body.exchange;
    newstock.product = req.body.product;
    newstock.comment = req.body.comment;
    newstock.BuyPrice = req.body.buyprice;
    newstock.Target = req.body.target;
    newstock.StopLoss = req.body.stoploss;
    newstock.PostDate.startdate.time.hour = date.format(today, 'H');
    newstock.PostDate.startdate.time.min = date.format(today, 'm');
    newstock.PostDate.startdate.time.timezone =  date.format(today, '[GMT]Z');
    newstock.PostDate.startdate.time.meridian = date.format(today, 'A');
    newstock.PostDate.startdate.day = date.format(today, 'dddd');
    newstock.PostDate.startdate.date = date.format(today, 'D');
    newstock.PostDate.startdate.month = date.format(today, 'M');
    newstock.PostDate.startdate.year = date.format(today, 'Y');
    newstock.PostDate.enddate.time.hour = date.format(next_month, 'H');
    newstock.PostDate.enddate.time.min = date.format(next_month, 'm');
    newstock.PostDate.enddate.time.timezone = date.format(next_month, '[GMT]Z');
    newstock.PostDate.enddate.time.meridian = date.format(next_month, 'A');
    newstock.PostDate.enddate.day = date.format(next_month, 'dddd');
    newstock.PostDate.enddate.date = date.format(next_month, 'D');
    newstock.PostDate.enddate.month = date.format(next_month, 'M');
    newstock.PostDate.enddate.year = date.format(next_month, 'Y');
   
    console.log(newstock.PostDate.startdate);
    console.log(newstock.PostDate.enddate);
    newstock.save();
    console.log(newstock);
    
    res.redirect("/admin/create");
 
 
 });
 module.exports = router;

 // router.post("/create",function (req,res){
//     res.render("stock/create")
// });

// router.get("/todaytop",middleware.issubscribed,function(req,res){
//     stock.find({},function(err,allstocks){
//         // var flag=0;
//         // var alladmin=[];
//         // user.findOne({id: req.user._json.sub}, function (err, founduser) {
//         //     // console.log("condition 0 found user");
//         //     // console.log(founduser);
//         //     // console.log("condition 0 finished");
//         //     if (err) {
//         //         console.log("Error raised");
//         //         console.log(err);
//         //     } else {
//         // if(founduser[0].Admin==true){
//         //     console.log("condition 0 found admin");
//         //     console.log(founduser);
//         //     console.log("condition 0 finished");
//         //     flag=99999;
//         // }
    
//         // console.log(stockcreated);
//         res.render("stocks/showall",{stock:allstocks,flag:0});
//     });
//      });
// // })
// // });




// router.get("/showall",middleware.issubscribed,function(req,res){
// //  const newstock ={ 
// //         StockName : "arnav",
// //         BuyPrice : 58,
// //         Target : 33,
// //         StopLoss : 25,
// //         freetrail: false,
// //         id:"25",    
// //         product:"dsnjns",
// //         //cash/futre/option
// //          exchange:"dsjnjsd",
// //         comment:"dsmk"};
//         stock.find({},function(err,found){
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 const flag=0;
//                 if(req.user.Admin==true){
//                     flag=99999;
//                 }
//                 // console.log(stockcreated);
//                 res.render("stocks/showall",{stock:found,flag:flag});
//             }
//         })
   
// });

