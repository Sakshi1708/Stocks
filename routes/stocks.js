var express=require("express");
var router=express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var mongoose=require("mongoose");
var user = require("../models/user");
var stock = require("../models/stock");

router.get("/showmypage",function(req,res){
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

// router.post("/create",function (req,res){
//     res.render("stock/create")
// });



module.exports = router;