var express = require('express');
var path = require('path');
var router = express.Router();

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var userInfo = require('../.././controllers/userInfo');
var mail = require('.././nodemailer');

router.use(passport.initialize());
router.use(passport.session());

passport.use(new FacebookStrategy({
        clientID: process.env.Facebook_clientID,
        clientSecret: process.env.Facebook_clientSecret,
        callbackURL: "https://localhost:8000/auth/facebook/callback",
        profileFields: ['id','emails','name']
    },function(accessToken, refreshToken, profile, cb) {
    	userInfo.find(profile._json.email,(err,user)=>{
            if(err)
                cb(err);
            if(user.length==0)
            {
                userInfo.saveUser(profile._json.first_name+" "+profile._json.last_name,profile._json.email,(err,data)=>{
                    if(err)
                        cb(err);
                    else
                    {
                        if(data.email.localeCompare('vikrantkumar158@gmail.com')!=0)
                        {
                            var mailOptions = {
                                from: 'vikrantkumar158@gmail.com',
                                to: data.email,
                                subject: 'Succesful registration on MusicSoft',
                                text: 'Welcome to MusicSoft. Username: '+data.email+' Password: '+data.password
                            };
                            mail.sendMail(mailOptions,(err,info)=>{
                                if(err)
                                    cb(err);
                                user.push(data);
                                cb(null,user);
                            });
                        }
                        else
                        {
                            user.push(data);
                            cb(null,user);
                        }
                    }
                });
            }
            else
            {
                return cb(null,user);
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.get('/',passport.authenticate('facebook',{scope:['public_profile','email']}));

router.get('/callback',passport.authenticate('facebook',{failureRedirect:'/Rock'}),(req,res)=>{
    if(req.user.length!=0)
    {
        req.session.isLogin=1;    
    }
    res.redirect('/');
});

module.exports = router;