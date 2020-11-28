const express = require('express')
var router=express.Router({mergeParams: true});
var mongoose = require('mongoose')
const User = require("../models/user");
const crypto = require('crypto')
//const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//const {JWT_SECRET} = require('../config/keys')
//const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { config } = require('dotenv');
const configur = require('../sendgrid/config');
const { doesNotMatch } = require('assert');
const { nextTick } = require('process');
const EMAIL = process.env.MY_MAIL;
var async = require("async");




router.get('/forgot', function(req, res) {
    res.render('user/forgot');
  });

router.post('/forgot',function(req,res,next){
    async.waterfall([
        function(done){
            crypto.randomBytes(32,function(err,buffer){      //to create a token
                if(err){
                console.log(err)
                }
                var token = buffer.toString('hex');
                done(err,token);
            });
        },
        function(token,done){
            User.findOne({EmailId:req.body.EmailId},function(err,user){
                if(!user){
                    req.flash('error','NO aacount');
                    return res.status(422).json({error:"User dont exists with that email"})
                }
                user.resetToken = token;
                user.expireToken = Date.now() + 3600000;
                user.save(function(err){
                    done(err,token,user);
                });
            });
        },
        function(token,user,done){
            
            var transport = nodemailer.createTransport({
               host:"127.0.0.1",
               port:3001,
                tls:{
                    rejectUnauthorized:true
                },
                auth:{
                    api_key:configur.mailConfig.key,
                    user:EMAIL,
                    pass:process.env.PASS
                }
            });        
        var mailoption ={
            to:User.EmailId,
            from:EMAIL,
            subject:"password reset",
            html:`
            <p>You requested for password reset</p>
            <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
            `
        };

        transport.sendMail(mailoption,function(err){
            console.log('mail sent');
            req.flash("success",'An email is been sent by '+ User.EmailId+ 'with instructoin');
            //res.json({message:"check your email"});
            done(err,'done');
        });
    }],function(err){
        console.log(err);
        if(err) return next(err);
        res.redirect('/forgot');
    })
});
router.get('/reset/:token', function(req, res) {
    User.findOne({ resetToken: req.params.token, expireToken: { $gt: Date.now()+360000  } }, function(err, user) {
        if (err) console.log(err);

      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
      }
      res.render('reset', {token:req.params.token});
    }
    );
});

    
// router.post('/reset/:token',function(req,res){
//     crypto.randomBytes(32,(err,buffer)=>{      //to create a token
//         if(err){
//             console.log(err)
//         }
//         const token = buffer.toString("hex")
        
//         User.findOne({email:user.email})
//         .then(user=>{
//             if(!user){
//                 return res.status(422).json({error:"User dont exists with that email"})
//             }
//             user.resetToken = token
//             user.expireToken = Date.now() + 3600000
//             user.save().then((result)=>{
//                 transporter.sendMail({
//                     to:user.email,
//                     from:"ssakshi_be18@thapar.com",
//                     subject:"password reset",
//                     html:`
//                     <p>You requested for password reset</p>
//                     <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
//                     `
//                 })
//                 res.json({message:"check your email"})
//             })

//         })
//     })
// })
module.exports = router;