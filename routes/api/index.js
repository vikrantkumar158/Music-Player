var express = require('express');
var router = express.Router();
var path = require('path');
var songInfo = require('../.././controllers/songInfo');

router.get("/img/:id",(req,res)=>{
	songInfo.getPicture(req.params.id,(err,data)=>{
		console.log(data);
		res.setHeader('Content-Type','image/jpeg');
		res.send(data[0].picture.data);
	});
});

module.exports = router;