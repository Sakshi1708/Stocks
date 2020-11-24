var mongoose = require('mongoose');
var stockSchema = new mongoose.Schema({
    StockName : String,
    BuyPrice : Number,
    Target : Number,
    StopLoss : Number,
    freetrail: Boolean,
    id:Number,    
    PostDate:{
        startdate:Date,
        enddate:Date
    },
    product:String ,
    //cash/futre/option
     exchange:String,
    comment:String
});

module.exports = mongoose.model('stock',stockSchema);