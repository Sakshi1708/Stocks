const mongoose = require('mongoose');
const User = new mongoose.Schema({
    FirstName : {
        type : String,
        required : true,
        unique : true
    },
    LastName : {
        type : String,
        required : true,
        unique:true
    },
    PhoneNo : Number,
    EmailId : {
        type : String,
        required : true,
        unique : true
    },
    Password : String,
    Subscription : {
    bought: Boolean,
    Price : {
        type : Number,
        default: 0
    },
    PostDate:{
        startdate:{type: Date},
        enddate:{type:Date}
    }
    },
    Admin : {
        type : Boolean,
        default : false
    },
    ft:{
        type: Boolean,
        default: false
    },
    id:{type:Number}
});

// activate subscription



module.exports = mongoose.model('User',User);