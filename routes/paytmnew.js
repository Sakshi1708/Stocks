var express=require("express");
const config =require("../paytm/checksum/config");
require('dotenv').config();
var router=express.Router({mergeParams: true});
const  checksum_lib=require("../paytm/checksum/checksum");
const user = require("../models/user");
const { isloggedin } = require("../middleware");

router.get("/paynow/:val",isloggedin, (req, res) => {
    // Route for making payment
    console.log(req);
    console.log("*****************************************************")

  console.log(req.user);

  console.log("*****************************************************")
  
  var paymentDetails = {
      amount:req.params.val,
      
      customerId:req.user.id,
      customerEmail:req.user._json.email,
      customerPhone:"7777777777"  
    }
    
//   var paymentDetails = {
//     amount: req.body.amount,
//     customerId: req.body.name,
//     customerEmail: req.body.email,
//     customerPhone: req.body.phone
// }
  if(!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
      console.log(paymentDetails);
    res.status(400).send('Payment failed')
  } else {
      var params = {};
      params['MID'] = config.PaytmConfig.mid;
      params['WEBSITE'] = config.PaytmConfig.website;
      params['CHANNEL_ID'] = 'WEB';
      params['INDUSTRY_TYPE_ID'] = 'Retail';
      params['ORDER_ID']="Merchant"+"@"+ Date.now()+"_"+Math.random().toString(36).substring(2,15),
      params['CUST_ID']=String(req.user.username)+Math.random().toString(36).substring(2,15),
      //params['ORDER_ID'] = 'TEST_'  + new Date().getTime();
      //params['CUST_ID'] = paymentDetails.customerId;
      params['TXN_AMOUNT'] = paymentDetails.amount;
      params['CALLBACK_URL'] = 'http://localhost:3001/callback/'+req.params.id+'/verified/'+ params['ORDER_ID']+'/value/'+params['TXN_AMOUNT'];
      params['EMAIL'] = paymentDetails.customerEmail;
      params['MOBILE_NO'] = paymentDetails.customerPhone;
  
  
      checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
          var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
          // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
  
          var form_fields = "";
          for (var x in params) {
              form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
          }
          form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";
  
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
          res.end();
      });
  }
  });

  
  router.post("/callback/:id/verified/:orderid/value/:price", function(req, res){
      
    user.findById(req.params.id,function(err,founduser){
        founduser.Subscription.bought=true;
        founduser.Subscription.price=req.params.price;
        founduser.PostDate.startdate= new Date.now();
        founduser.PostDate.startdate=founduser.PostDate.startdate;
        founduser.save();
        console.log("user updated");
    })
      req.flash("sucess","Payment sucessful");
      res.render("stocks/showall");
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