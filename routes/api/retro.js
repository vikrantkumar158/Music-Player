var express=require('express');
var router=express.Router();
var path=require('path');

router.use(express.static(path.join(__dirname,'.././public')));

router.get("/",(req,res)=>{
    res.render("retro.ejs");
});

module.exports=router;