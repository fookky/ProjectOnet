const express = require("express"),
      router = express.Router(),
      post = require("../models/post"),
      middleware = require("../middleware");
    
router.get("/comunity",middleware.isLoggedIn,function(req,res){
   post.find({},function(error,allpost){
        if(error){
           console.log("error-------");
      }else{
           
           res.render("socials/social",{post:allpost});
           
       }
})
});
router.get("/",function(req,res){
    res.render("index");
   });
router.get("/comunity",middleware.isLoggedIn,function(req,res){
       res.render("socials/social");
   });
   
   
router.get("/quiz",middleware.isLoggedIn,function(req,res){
        res.render("quizeonet");
   });
   router.get("/thaiquiz",function(req,res){
    res.render("thaiquize");
});
router.get("/review",function(req,res){
    res.render("reviewdepart");
});

router.get("/post",middleware.isLoggedIn,function(req,res){
    res.render("socials/addpost");
});
router.post("/comunity",middleware.isLoggedIn,function(req,res){
    let n_name = req.body.name;
    let n_image = req.body.image;
    let n_desc = req.body.desc;
    let author = {
        id: req.user._id,
        username: req.user.username
      };
    let newsposts = {
         name:n_name,
         image:n_image,
         desc:n_desc,
        author: author
      };
    post.create(newsposts,function(error,newpost){
        if(error){
            console.log(error);
        }else{
             console.log("add new");
             res.redirect("/edu/comunity");
        };
    })
 });
router.get("/post/:post_id",middleware.isLoggedIn,function(req,res){
    post.findById(req.params.post_id).populate("comments").exec(function(error,idpost){
        if(error){
            console.log("error3636");      
        }else{
            res.render("socials/showdetail",{post:idpost});
        }
    });
});

router.get('/post/:post_id/edit', middleware.postOwner,
  function(req, res) {
    post.findById(req.params.post_id, function(err, foundpost) {
      if (err) {
        req.flash('error', 'Travel Diary was not found');
        res.redirect('back');
      } else {
        res.render('socials/edit', {
          post: foundpost
        });
      }
    });
  }
);



router.put('/post/:post_id', middleware.postOwner,
  function(req, res) {
    post.findByIdAndUpdate(req.params.post_id, req.body.post,
      function(err) {
        if (err) {
          req.flash('error', 'Travel Diary was not found');
          res.redirect('back');
        } else {
          req.flash('success', 'Travel Diary was updated');
          res.redirect('/edu/post/' + req.params.post_id);
        }
      }
    );
  }
);


router.delete('/post/:post_id', middleware.postOwner,
  function(req, res) {
    post.findByIdAndRemove(req.params.post_id, function(err) {
      if (err) {
        req.flash('error', 'Travel Diary was not found');
        res.redirect('back');
      } else {
        req.flash('error', 'Travel Diary was deleted');
        res.redirect('/post');
      }
    });
  }
);



module.exports =router;