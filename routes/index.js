const middleware = require("../middleware");
const User = require("../models/user");

const express = require("express"),
      router = express.Router(),
      passport = require("passport");
      

router.get("/",function(req,res){
    res.render("main");
});
router.get("/",function(req,res){
    res.render("main");
});


 router.get('/profile/:user_id', function (req, res) {
    User.findById(req.params.user_id).populate({
      path: 'userposthis', model: 'edu'
    }).exec(function (err, DataUser) {
       console.log(DataUser);
      res.render("users/profile", { user: DataUser, userpost: DataUser.userposthis });
    })
  })



 router.get('/profile/:user_id/edit',function(req, res) {
    User.findById(req.params.user_id, function(err, founduser) {
      if (err) {
          console.log(err);
        req.flash('error', 'user was not found');
        res.redirect('back');
      } else {
        res.render('users/editprofile', {
            user: founduser
        });
      }
    });
  }
);

router.put("/profile/:user_id",middleware.isLoggedIn, function(req, res){
    User.findByIdAndUpdate(req.params.user_id, req.body.user, function(err, updateduser){
       if(err){
           res.redirect("/profile/:user_id");
       } else {
           res.redirect("/profile/" + req.params.user_id);
       }
    });
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
    if(req.body.adminCode === "secret123"){
        User.isAdmin = true;
        res.redirect("/admin");
    }
    User.register(new User({username:req.body.username,firstname: req.body.firstname,Surname:req.body.Surname,mail:req.body.mail,School:req.body.School,Level:req.body.Level }),req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash('success','Welcome ' + user.username);
            res.redirect("/edu");
        });
    });
});


module.exports =router;