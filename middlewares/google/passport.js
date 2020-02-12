var express=require('express');
var path=require('path');
var router=express.Router();
var bcrypt=require('bcrypt');

var passport=require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
        clientID: "890716421881-muvu3am27891e525f3iii7bnqeo9otu7.apps.googleusercontent.com",
        clientSecret: "dDGjZ4JdPMVVVRFc2VpnQvOP",
        callbackURL: "https://127.0.0.1:8000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        return cb(null,"Success");
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

router.get('/callback',passport.authenticate('google',{failureRedirect:'/Rock'}),(req,res)=>{
    res.redirect('/');
});

module.exports=router;