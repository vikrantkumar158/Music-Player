var express=require('express');
var path=require('path');
var router=express.Router();

var passport=require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var userInfo = require('../.././controllers/userInfo');
var mail = require('.././nodemailer');

router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
        clientID: "890716421881-muvu3am27891e525f3iii7bnqeo9otu7.apps.googleusercontent.com",
        clientSecret: "dDGjZ4JdPMVVVRFc2VpnQvOP",
        callbackURL: "https://127.0.0.1:8000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        userInfo.find(profile._json.email,(err,user)=>{
            if(err)
                cb(err);
            if(user.length==0)
            {
                userInfo.saveUser(profile._json.name,profile._json.email,(err,data)=>{
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

router.get('/',passport.authenticate('google',{
    scope:[
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]})
);

router.get('/callback',passport.authenticate('google',{failureRedirect:'/?error=nologin'}),(req,res)=>{
    if(req.user.length!=0)
    {
        req.session.isLogin=1; 
    }
    res.redirect('/');
});

module.exports=router;