var express=require('express');
var path=require('path');
var router=express.Router();
var bcrypt=require('bcrypt');

var passport=require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "127.0.0.1:8000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(err,"Success");
    }
));

app.get('/google',passport.authenticate('google',{scope:['profile']}));

app.get('/google/callback',passport.authenticate('google',{failureRedirect:'/Rock'}),(req,res)=>{
    res.redirect('/');
});

module.exports=router;