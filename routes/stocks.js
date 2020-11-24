var express=require("express");
var router=express.Router({mergeParams: true});
var middleware = require("../middleware/index");
var mongoose=require("mongoose");
var user = require("../models/user").user;
var stock = require("../models/stock").stock;

router.get("/",function(req,res){
 const newstock ={ 
        StockName : "arnav",
        BuyPrice : 58,
        Target : 33,
        StopLoss : 25,
        freetrail: false,
        id:"25",    
        product:"dsnjns",
        //cash/futre/option
         exchange:"dsjnjsd",
        comment:"dsmk"};
        
    
        console.log("hi");
        
        stock.create(newstock,function(err,stockcreated){
            if(err){
                console.log(err);
            }
            else{
                console.log(stockcreated);
                res.render("stocks/showall");
            }
        })
   
});
router.get("/create",function(req,res){
    res.render("stock/createstock");
});
router.get("/subscription",middleware.isloggedin,(req,res)=>{
    res.render("user/subscription");
});
router.post("/create",function (req,res){

 
});



module.exports = router;