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
    let n_card = {name:n_name,image:n_image,desc:n_desc};
    post.create(n_card,function(error,newpost){
        if(error){
            console.log(error);
        }else{
             console.log("add new");
             res.redirect("/edu/comunity");
        };
    })
 });
router.get("/post/:id",middleware.isLoggedIn,function(req,res){
    post.findById(req.params.id).populate("comments").exec(function(error,idpost){
        if(error){
            console.log("error3636");      
        }else{
            res.render("socials/showdetail",{post:idpost});
        }
    });
});



module.exports =router;