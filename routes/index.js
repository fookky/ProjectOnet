const middleware = require("../middleware");

const express = require("express"),
      router = express.Router();
      passport = require("passport"),
      User = require("../models/user"),
      

router.get("/",function(req,res){
    res.render("main");
});



router.get("/login",function(req,res){
    res.render("login");
});
router.post("/login",passport.authenticate("local" ,{
    successRedirect: '/edu',
    failureRedirect: 'login'
}),function(req,res){
});

router.get("/logout",function(req,res){
    req.logout();
    req.flash('success','คุณออกจากระบบสำเร็จ');
    res.redirect('/');
});


router.get("/signup",function(req,res){
    res.render("signup");
});
router.post("/signup",function(req,res){
    User.register(new User({username:req.body.username,firstname: req.body.firstname,Surname:req.body.Surname,mail:req.body.mail,School:req.body.School,Level:req.body.Level }),req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash('success','ยินดีต้อนรับ ' + user.username);
            res.redirect("/edu");
        });
    });
});


module.exports =router;