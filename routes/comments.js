const express = require("express"),
      router = express.Router({mergeParams:true}),
      post = require("../models/post"),
      comment = require("../models/comment"),
      middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
    //console.log(req.params.id);
    post.findById(req.params.id, function(err,post){
        if(err){
            console.log(err);
        }else{
            res.render("comment/new",{post:post});
        }
    });
});

router.post("/",middleware.isLoggedIn,function(req,res){
    post.findById(req.params.id,function(err,post){
        if(err){
            console.log(err);
        }else{
            comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    post.comments.push(comment);
                    post.save();
                    res.redirect("/edu/post/" + post._id);        
                }
            });
        }
    });
});

module.exports = router;