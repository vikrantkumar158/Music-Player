module.exports=(req,res,next)=>{
	if(req.session.isLogin)
		next();
	else
		res.redirect("/?error="+encodeURIComponent('nologin'));
}