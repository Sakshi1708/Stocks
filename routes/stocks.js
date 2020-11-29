var express=require("express");
var router=express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var mongoose=require("mongoose");
var user = require("../models/user");
var stock = require("../models/stock");
const date = require('date-and-time');

router.get("/showall",function(req,res){
//  const newstock ={ 
//         StockName : "arnav",
//         BuyPrice : 58,
//         Target : 33,
//         StopLoss : 25,
//         freetrail: false,
//         id:"25",    
//         product:"dsnjns",
//         //cash/futre/option
//          exchange:"dsjnjsd",
//         comment:"dsmk"};
        stock.find({},function(err,found){
            if(err){
                console.log(err);
            }
            else{

                // console.log(stockcreated);
                res.render("stocks/showall",{stock:found});
            }
        })
   
});


router.get("/create",function(req,res){

 
    res.render("stocks/createstock");
});
router.post("/adminportal", function(req,res){
    console.log(req.body);
    const today=new Date();
    const next_month = date.addMonths(today, 1);
    var newstock = new stock();
    newstock.StockName = req.body.stockname;
    newstock.exchange =req.body.exchange;
    newstock.product = req.body.product;
    newstock.comment = req.body.comment;
    newstock.buyprice = req.body.buyprice;
    newstock.target = req.body.target;
    newstock.PostDate.startdate = 
    newstock.PostDate.startdate.time.hour = date.format(today, 'H');
    newstock.PostDate.startdate.time.min = date.format(today, 'm');
    newstock.PostDate.startdate.time.timezone =  date.format(today, '[GMT]Z');
    newstock.PostDate.startdate.time.meridian = date.format(today, 'A');
    newstock.PostDate.startdate.day = date.format(today, 'dddd');
    newstock.PostDate.startdate.date = date.format(today, 'D');
    newstock.PostDate.startdate.month = date.format(today, 'M');
    newstock.PostDate.startdate.year = date.format(today, 'Y');
    newstock.PostDate.enddate.time.hour = date.format(next_month, 'H');
    newstock.PostDate.enddate.time.min = date.format(next_month, 'm');;
    newstock.PostDate.enddate.time.timezone = date.format(next_month, '[GMT]Z');;
    newstock.PostDate.enddate.time.meridian = date.format(next_month, 'A');;
    newstock.PostDate.enddate.day = date.format(next_month, 'dddd');;
    newstock.PostDate.enddate.date = date.format(next_month, 'D');;
    newstock.PostDate.enddate.month = date.format(next_month, 'M');;
    newstock.PostDate.enddate.year = date.format(next_month, 'Y');;
   
    console.log(newstock.PostDate.startdate);
    console.log(newstock.PostDate.enddate);
     res.redirect("/adminportal");
 
 
 });
// router.post("/create",function (req,res){
//     res.render("stock/create")
// });



module.exports = router;



