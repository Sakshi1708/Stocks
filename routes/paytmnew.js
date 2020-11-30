var express = require("express");
const config = require("../paytm/checksum/config");
require('dotenv').config();
var router = express.Router({
  mergeParams: true
});
const checksum_lib = require("../paytm/checksum/checksum");
const user = require("../models/user");
const {
  isloggedin
} = require("../middleware");
const date = require('date-and-time');
var mongoose = require("mongoose");

router.get("/paynow/:val", isloggedin, (req, res) => {
  // Route for making payment
  //console.log(req);
  console.log("*****************************************************")
  console.log(req.user);
  console.log("*****************************************************")

  var paymentDetails = {
    amount: req.params.val,

    customerId: req.user._json.sub,
    customerEmail: req.user._json.email,
    customerPhone: "7777777777"
  }

  //   var paymentDetails = {
  //     amount: req.body.amount,
  //     customerId: req.body.name,
  //     customerEmail: req.body.email,
  //     customerPhone: req.body.phone
  // }
  if (!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
    console.log(paymentDetails);
    res.status(400).send('Payment failed')
  } else {
    var params = {};
    params['MID'] = config.PaytmConfig.mid;
    params['WEBSITE'] = config.PaytmConfig.website;
    params['CHANNEL_ID'] = 'WEB';
    params['INDUSTRY_TYPE_ID'] = 'Retail';
    params['ORDER_ID'] = "Merchant" + "@" + Date.now() + "_" + Math.random().toString(36).substring(2, 15),
      params['CUST_ID'] = String(req.user.id) + Math.random().toString(36).substring(2, 15),
      //params['ORDER_ID'] = 'TEST_'  + new Date().getTime();
      //params['CUST_ID'] = paymentDetails.customerId;
      params['TXN_AMOUNT'] = paymentDetails.amount;
    params['CALLBACK_URL'] = 'http://localhost:3001/callback/' + req.user.id + '/verified/' + params['ORDER_ID'] + '/value/' + params['TXN_AMOUNT'];
    params['EMAIL'] = paymentDetails.customerEmail;
    params['MOBILE_NO'] = paymentDetails.customerPhone;
    console.log(params);

    checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
      var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
      // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

      var form_fields = "";
      for (var x in params) {
        form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
      }
      form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
      res.end();
    });
  }
});

const now = new Date();

router.post("/callback/:id/verified/:orderid/value/:price", function (req, res) {
  if (req.params.price == 1299) {
    var sub_date = date.addMonths(now, 3);
  } else {
    if (req.params.price == 2299) {
      var sub_date = date.addMonths(now, 6);
    } else if (req.params.price == 2899) {
      var sub_date = date.addYears(now, 1);
    }
  }

  console.log(req.params.id);
  var flag = 0;
  user.find({}, function (err, allusers) {
    if (err) {
      console.log(err);
    } else {
      var founduser = [];
      allusers.forEach(function (foundone) {
        if (foundone.id == req.params.id) {
          console.log("User found");
          console.log(foundone);
          console.log("jo user mil gya hai")
          founduser.push(foundone);
          flag = 1;
        }
      });
      if (flag == 1) {
        req.flash("sucess", "Payment sucessful");
        console.log(founduser);
        foundone = founduser[0];
        foundone.Subscription.bought = true;
        foundone.Subscription.Price = req.params.price;
        foundone.SubscriptionDate.startdate.time.hour = date.format(now, 'H');
        foundone.SubscriptionDate.startdate.time.min = date.format(now, 'm');
        foundone.SubscriptionDate.startdate.time.timezone = date.format(now, '[GMT]Z');
        foundone.SubscriptionDate.startdate.time.meridian = date.format(now, 'A');
        foundone.SubscriptionDate.startdate.day = date.format(now, 'dddd');
        foundone.SubscriptionDate.startdate.date = date.format(now, 'D');
        foundone.SubscriptionDate.startdate.month = date.format(now, 'M');
        foundone.SubscriptionDate.startdate.year = date.format(now, 'Y');
        foundone.SubscriptionDate.enddate.time.hour = date.format(sub_date, 'H');
        foundone.SubscriptionDate.enddate.time.min = date.format(sub_date, 'm');;
        foundone.SubscriptionDate.enddate.time.timezone = date.format(sub_date, '[GMT]Z');;
        foundone.SubscriptionDate.enddate.time.meridian = date.format(sub_date, 'A');;
        foundone.SubscriptionDate.enddate.day = date.format(sub_date, 'dddd');
        foundone.SubscriptionDate.enddate.date = date.format(sub_date, 'D');
        foundone.SubscriptionDate.enddate.month = date.format(sub_date, 'M');
        foundone.SubscriptionDate.enddate.year = date.format(sub_date, 'Y');
        foundone.SubscriptionDate.completeenddate = sub_date;
        foundone.save();
        console.log("user updated");
        console.log(foundone);
        console.log(foundone.SubscriptionDate.enddate);
        console.log(foundone.Subscription);

        res.redirect("/showall");
      } else {
        res.send("Sorry, we will refund u! Kindly email at anoopguptaemailid@yahoo.com");
      }
    }


  });
});



//   const User = new mongoose.Schema({
//     FirstName: String,
//     LastName : String,
//     PhoneNo : Number,
//     EmailId : String,
//     Password : String,
//     Subscription : {
//     bought: Boolean,
//     Price : Number    
//     }, 
//     PostDate:{
//         startdate: Date,
//         enddate:Date
//     },
//     Admin : Boolean,
//     //freetrial
//     freetrial: Boolean,
//     id:Number
// });

//   router.post("/callback", (req, res) => {

//     // Route for verifiying payment

//     var body = '';

//     req.on('data', function (data) {
//        body += data;
//     });

//      req.on('end', function () {
//        var html = "";
//        var post_data = qs.parse(body);

//        // received params in callback
//        console.log('Callback Response: ', post_data, "\n");


//        // verify the checksum
//        var checksumhash = post_data.CHECKSUMHASH;
//        // delete post_data.CHECKSUMHASH;
//        var result = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);
//        console.log("Checksum Result => ", result, "\n");


//        // Send Server-to-Server request to verify Order Status
//        var params = {"MID": config.PaytmConfig.mid, "ORDERID": post_data.ORDERID};

//        checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {

//          params.CHECKSUMHASH = checksum;
//          post_data = 'JsonData='+JSON.stringify(params);

//          var options = {
//            hostname: 'securegw-stage.paytm.in', // for staging
//            // hostname: 'securegw.paytm.in', // for production
//            port: 443,
//            path: '/merchant-status/getTxnStatus',
//            method: 'POST',
//            headers: {
//              'Content-Type': 'application/x-www-form-urlencoded',
//              'Content-Length': post_data.length
//            }
//          };


//          // Set up the request
//          var response = "";
//          var post_req = https.request(options, function(post_res) {
//            post_res.on('data', function (chunk) {
//              response += chunk;
//            });

//            post_res.on('end', function(){
//              console.log('S2S Response: ', response, "\n");

//              var _result = JSON.parse(response);
//                if(_result.STATUS == 'TXN_SUCCESS') {
//                    res.send('payment sucess')
//                }else {
//                    res.send('payment failed')
//                }
//              });
//          });
//          console.log(post_data);
//          // post the data
//          post_req.write(post_data);
//          post_req.end();
//         });
//        });
//   });

module.exports = router;