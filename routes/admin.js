const { Mongoose } = require("mongoose");

const express = require("express"),
      router = express.Router(),
      post = require("../models/post"),
      middleware = require("../middleware"),
      user = require("../models/user");


router.get("/",middleware.isAdmin,function(req,res){
    // user.isAdmin = "true";
    res.render("admin/admin");
 });
//  router.get("/postmange/view",middleware.isLoggedIn,function(req,res){
//   // user.isAdmin = "true";
//   res.render("admin/view");
// });
 
// router.get("/user",middleware.isLoggedIn,function(req,res){
//     // user.isAdmin = "true";
//     res.render("admin/user");
//  });
 router.get("/user",middleware.isAdmin,function(req,res){
    user.find({},function(error,alluser){
         if(error){
            console.log("error-------");
       }else{
            
            res.render("admin/user",{user:alluser});
            
        }
 })
 });
 router.get('/user/delete/:user_id', middleware.isAdmin,
  function(req, res) {
    user.findByIdAndDelete(req.params.user_id, function(err) {
      if (err) {
        req.flash('error', 'user was not found');
        next(err);
      } else {
        req.flash('error', 'user was deleted');
        res.redirect('/admin/user'  );
      }
    });
  }
);


router.get("/postmange",middleware.isAdmin,function(req,res){
    post.find({},function(error,allpost){
         if(error){
            console.log("error-------");
       }else{
            
            res.render("admin/postmange",{postall:allpost});
            
        }
 })
 });

 router.get('/postmange/delete/:post_id', middleware.isAdmin,
  function(req, res) {
    post.findByIdAndDelete(req.params.post_id, function(err) {
      if (err) {
        req.flash('error', 'post was not found');
        next(err);
      } else {
        req.flash('error', 'post was deleted');
        res.redirect('/admin/postmange');
      }
    });
  }
);

router.get("/postmange/view/:post_id",middleware.isAdmin,function(req,res){
  post.findById(req.params.post_id).populate("comments").exec(function(error,idpost){
      if(error){
          console.log("error3636");      
      }else{
          res.render("admin/view",{post:idpost});
      }
  });
});


 module.exports =router;