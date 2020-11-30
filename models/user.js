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
    SubscriptionDate:{
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
        completeenddate:Date,
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
    Signup:{
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
    Admin : Boolean,
    //freetrial
    freetrial: Boolean,
    id:String
});

// activate subscription



module.exports = mongoose.model('User',User);