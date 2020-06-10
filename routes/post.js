const express = require("express"),
      router = express.Router(),
      post = require("../models/post");
    
router.get("/comunity",isLoggedIn,function(req,res){
   post.find({},function(error,allpost){
        if(error){
           console.log("error-------");
      }else{
           
           res.render("social",{post:allpost});
           
       }
})
});
router.get("/",isLoggedIn,function(req,res){
    res.render("index");
   });
router.get("/comunity",isLoggedIn,function(req,res){
       res.render("social");
   });
   
   
router.get("/quiz",isLoggedIn,function(req,res){
        res.render("quizeonet");
   });
   router.get("/thaiquiz",function(req,res){
    res.render("thaiquize");
});
router.get("/review",function(req,res){
    res.render("reviewdepart");
});

//router.get("/",middleware.isLoggedIn, function(req,res){
//    Tarot.find({},function(error, allTarot){
//        if(error){
//            console.log("Error!");
//        } else {
//            res.render("tarots/index",{Tarot:allTarot});
//        }
//    })
//});

router.get("/post",isLoggedIn,function(req,res){
    res.render("addpost");
});
router.post("/comunity",isLoggedIn,function(req,res){
    let n_name = req.body.name;
    let n_image = req.body.image;
    let n_desc = req.body.desc;
    let n_card = {name:n_name,image:n_image,desc:n_desc};
    post.create(n_card,function(error,newpost){
        if(error){
            console.log("error!!!!");
        }else{
             console.log("add new");
             res.redirect("/edu/comunity");
        };
    })
 });
router.get("/post/:id",isLoggedIn,function(req,res){
    post.findById(req.params.id,function(error,idpost){
        if(error){
            console.log("error3636");      
        }else{
            res.render("showdetail",{post:idpost});
        }
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
};

module.exports =router;