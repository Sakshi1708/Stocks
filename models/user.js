const mongoose = require('mongoose');
const User = new mongoose.Schema({
    FullName:String,
    FirstName: String,
    LastName : String,
    PhoneNo : Number,
    EmailId : String,
    Password : String,
    Subscription : {
    bought: Boolean,
    Price : Number    
    }, 
    PostDate:{
        startdate: Date,
        enddate:Date
    },
    Admin : Boolean,
    //freetrial
    freetrial: Boolean,
    id:String
});

// activate subscription



module.exports = mongoose.model('User',User);