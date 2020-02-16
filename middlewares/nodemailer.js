var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  	service: 'gmail',
  	auth:{
    	user: process.env.emailID,
    	pass: process.env.password
  	}
});

exports.sendMail = (mailOptions,cb)=>
{
	transporter.sendMail(mailOptions,(error, info)=>{
		if (error)
			cb(error);
		cb(null,info);
	});
}