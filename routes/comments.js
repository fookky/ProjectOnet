
const express = require("express"),
      router = express.Router({mergeParams:true}),
      post = require("../models/post"),
      comment = require("../models/comment"),
      middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
    //console.log(req.params.id);
    post.findById(req.params.post_id, function(err,post){
        if(err){
            console.log(err);
        }else{
            res.render("comment/new",{post:post});
        }
    });
});

router.post("/",middleware.isLoggedIn,function(req,res){
    post.findById(req.params.post_id,function(err,post){
        if(err){
            req.flash("error", "แสดงความคิดเห็นล้มเหลว");
        }else{
            comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    req.flash("success", "Comment was added");
                    
                    // post.comments.push(comment);
                    // post.save();
                     res.redirect("/edu/post/" + post._id);        
                }
            });
        }
    });
});

router.get('/:comment_id/edit', middleware.CommentOwner,function(req, res) {
    comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        req.flash('error', 'Comment was not found');
        res.redirect('back');
      } else {
        res.render('comment/edit', {
          comment: foundComment,
          post_id: req.params.post_id
        });
      }
    });
  }
);

router.put('/:comment_id', middleware.CommentOwner,
  function(req, res) {
    comment.findByIdAndUpdate(
      req.params.comment_id, req.body.comment,
      function(err) {
        if (err) {
          req.flash('error', 'Comment was not found');
          res.redirect('back');
        } else {
          req.flash('success', 'Comment was updated');
          res.redirect('/edu/post/' + req.params.post_id);
        }
      }
    );
  }
);

router.delete('/:comment_id', middleware.CommentOwner,
  function(req, res) {
    comment.findByIdAndRemove(req.params.comment_id, function(err) {
      if (err) {
        console.log(err);
        req.flash('error', 'Comment was not found');
        res.redirect('back');
        
      } else {
        console.log(err);
        req.flash('success', 'Comment was deleted');
        res.redirect('/edu/post/' + req.params.post_id);
      }
    });
  }
);



module.exports = router;