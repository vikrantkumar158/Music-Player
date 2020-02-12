var express=require('express');
var router=express.Router();
var path=require('path');

router.use(express.static(path.join(__dirname,'.././public')));

router.get("/",(req,res)=>{
    res.render("index.ejs");
});

router.use('/upload',require('./api/upload'));
router.use('/classical',require('./api/classical'));
router.use('/party',require('./api/party'));
router.use('/pop',require('./api/pop'));
router.use('/retro',require('./api/retro'));
router.use('/rock',require('./api/rock'));
router.use('/auth',require('.././middlewares'));
router.use('/',require('./api/index'));

module.exports=router;