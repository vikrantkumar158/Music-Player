var express=require('express');
var router=express.Router();
var path=require('path');

var songInfo = require('../.././controllers/songInfo');

router.use(express.static(path.join(__dirname,'.././public')));

router.get("/",(req,res)=>{
	songInfo.findByGenre("Pop",(err,data)=>{
		res.render("pop.ejs",{data:data});
	});
});

module.exports=router;