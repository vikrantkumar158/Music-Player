var express = require('express');
var path = require('path');
var router = express.Router();
var bcrypt = require('bcrypt');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.use(new FacebookStrategy({
        clientID: "622582245183963",
        clientSecret: "cefd992d7037d9640ba38f92e483c594",
        callbackURL: "https://localhost:8000/auth/facebook/callback",
        profileFields: ['id','emails','name']
    },function(accessToken, refreshToken, profile, cb) {
    	console.log(profile);
        return cb(null,profile);
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
    res.redirect('/');
});

module.exports = router;