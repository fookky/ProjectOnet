module.exports = {
    isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','กรุณา login ก่อน');
    res.redirect("/login")
}
}