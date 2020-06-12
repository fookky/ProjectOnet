module.exports = {
    isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please LOGIN First");
    res.redirect("/login");
}
}