var mongoose = require('mongoose');
var stockSchema = new mongoose.Schema({
    StockName : String,
    BuyPrice : Number,
    Target : Number,
    StopLoss : Number,
    freetrail: Boolean,
    id:Number,    
    PostDate:{
        startdate: {
            time:{
                hour:String,
                min:String,
                timezone:String,
                meridian:String
            },
            day:String,
            date:  Number,
            month: Number,
            year:  Number

        },
        enddate:{
            time:{
                hour:String,
                min:String,
                timezone:String,
                meridian:String
            },
            day:String,
            date:  Number,
            month: Number,
            year:  Number
        }
    },
    product:String ,
    //cash/futre/option
     exchange:String,
    comment:String
});

module.exports = mongoose.model('stock',stockSchema);