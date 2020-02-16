var express=require('express');
var router=express.Router();
var path=require('path');

var songInfo = require('../.././controllers/songInfo');

router.use(express.static(path.join(__dirname,'.././public')));

router.get("/",(req,res)=>{
	songInfo.findByGenre("Rock",(err,data)=>{
		res.render("rock.ejs",{data:data});
	});
});

module.exports=router;