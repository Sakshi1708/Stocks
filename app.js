
var express=require("express")
var app=express();
app.set("view engine","ejs");
app.use(express.static("public"));

const path = require('path');

var cors=require('cors');
app.use(cors());

var passport=require("passport");
var localstrategy=require("passport-local");
var passportlocalmongoose=require("passport-local-mongoose");
var expresssession=require("express-session");

var methodoverride=require("method-override");
app.use(methodoverride("_method"));

var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

require('dotenv').config();



var mongoose=require("mongoose");
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,useUnifiedTopology: true});

var flash = require("connect-flash");
app.use(flash());
///////////////////////////////////////////////////////////////////////////////////////////

var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  var time = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
console.log(time);
  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
   time = "EXPIRED";
  }
}, 1000);



/////////////////////////////////////////////////////////////////////////////////////////////////////

var indexroutes=require("./routes/index");
var paymentroutes=require("./routes/payment");
var stockroutes =require("./routes/stocks");
var userroutes =require("./routes/User");
var paymentroutes=require("./routes/paytmnew");
// ////////////////////////////////////
// payment gateway////////////////////
/////////////////////////////////////




///////////////////////////////////////
////////////////configuration/////////
app.use(expresssession({
    secret: "can be anything",
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req,res,next){
    res.locals.currentuser = req.user; //req.user contains the info of currently logged in user
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})


app.use(indexroutes); 
app.use(paymentroutes);
app.use(stockroutes);
app.use(userroutes);
app.use(paymentroutes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}



//////////////////////////////
app.listen(port,function(){
    console.log("server has been started");
})
