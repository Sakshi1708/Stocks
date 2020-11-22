var mongoose = require('mongoose');
var stock = new mongoose.Schema({
    StockName : {
        type : String,
        required : true,
        unique : true
    },
    BuyPrice : {
        type : Number,
        default: 0
    },
    Target : {
        type : Number,
        default: 0
    },
    StopLoss : {
        type : Number,
        default: 0
    },
    freetrail:{
        type: Boolean
    },
    id:{
        type:Number,
        required:true
    },    
    PostDate:{
        startdate:{type: Date},
        enddate:{type:Date}
    },
    product:{type:String },
    //cash/futre/option
     exchange:{
        type:String
    },
    comment:{
        type:String
    }
});

module.exports = mongoose.model('stock',stock);