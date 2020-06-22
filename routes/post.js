const express = require("express"),
      router = express.Router(),
      multer = require("multer"),
      path = require("path"),
      fs = require("fs"),
      post = require("../models/post"),
      middleware = require("../middleware"),
       user = require("../models/user"),
       learn = require("../models/learn"),
       department = require("../models/department"),
       Comment = require("../models/comment");

       function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      };

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb) {
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function(req, file, cb){
  var ext = path.extname(file.originalname);
  if(ext !== '.png' && ext !== '.gif' && ext !== '.jpg' && ext !== '.jpeg' ){
      return cb(new Error("Only image is allowed"), false)
      }
      cb(null, true);
};

const upload = multer({storage: storage, fileFilter: imageFilter});
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// show all posts
router.get("/comunity", function(req, res){
  var noMatch = null;
  if(req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      post.find({$or: [{name: regex},{type: regex},{desc: regex},{'author.username': regex}]}, function(err, allpost){
         if(err){
            console.log(err);
         } else {
             if (allpost.length <1){
                 noMatch = "Can not find the post you are looking for";
             }
            res.render("socials/social", {post:allpost, noMatch: noMatch})
         }
      });
  } else {
      post.find({}, function(err, allpost){
         if(err){
             console.log(err);
         } else {
              res.render("socials/social",{post:allpost, page: 'post', noMatch: noMatch});
         }
      });
  }

});
router.get("/comunity/newest", function(req, res){
  //Get all posts from DB
  post.find().sort({_id: -1}).exec(function (err, allpost){
      if (err){
          console.log(err);
      }else {
          res.render("socials/social", {post:allpost, noMatch: null})
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

// create
router.post("/comunity",middleware.isLoggedIn,upload.single("image") ,function(req,res){
  // if(req.file){
  //   console.log("Image up");
  // }else{
  //   console.log("fail");
  // }
    let n_name = req.body.name;
    let n_image = req.file.filename;
    let n_desc = req.body.desc;
    let n_type = req.body.type;
    let author = {
        id: req.user.id,
        username: req.user.username
      };
    let newsposts = {
         name:n_name,
         image:n_image,
         desc:n_desc,
         type:n_type,
         author: author,

      };
      console.log(newsposts);
    post.create(newsposts,function(error,newpost){
        if(error){
            console.log(error);
        }else{
             console.log("add new");
             res.redirect("/edu/comunity");
        };
    })
 });

// showpost
router.get("/post/:post_id",middleware.isLoggedIn,function(req,res){
    post.findById(req.params.post_id).populate("comments").exec(function(error,idpost){
        if(error){
            console.log("error3636");      
        }else{
            res.render("socials/showdetail",{post:idpost});
        }
    });
});



// count like
// router.post("/post/:post_id", isLoggedIn, function(req, res){
//   var userId = req.user._id;
//   post.findById(req.params.post_id, function(err, post){
//       if(err){
//           req.flash("error", err.message);
//           res.redirect("back");
//       };
//       var votedPost = {
//       postId: post,
//       userChoice: Object.keys(req.body)[0]};
//       if (votedPost.userChoice == "Fact"){
//           post.numFact++;
//       }
//       else if (votedPost.userChoice == "Myth"){
//           post.numMyth++;
//       };
//       post.totalVotes++;
//       post.save()
//       user.findById(userId, function(err, user){
//           if (err){
//               req.flash("error", err.message);
//               res.redirect("back");}
//           user.votedPosts.push(votedPost);
//           user.save();
//       });
//   });
// });

// edit
router.get('/post/:post_id/edit', middleware.postOwner,
  function(req, res) {
    post.findById(req.params.post_id, function(err, foundpost) {
      if (err) {
        req.flash('error', 'Post was not found');
        res.redirect('back');
      } else {
        res.render('socials/edit', {
          post: foundpost
        });
      }
    });
  }
);

// update

router.put('/post/:post_id', middleware.postOwner, upload.single('image'),
  function(req, res) {
    let n_name = req.body.name;
    let n_desc = req.body.desc;
    if(req.file){
      let n_image = req.file.filename;
      post.findById(req.params.post_id,function(err,fondpost){
        if(err){
          res.redirect("/edu/post");
        }else{
          const imagePath = "./public/uploads/" + fondpost.image;
          fs.unlink(imagePath,function(err){
            if(err){
              console.log(err);
              res.redirect('/edu/post/:post_id');
          }
          })
        }
      })
      var newsposts = {
        name:n_name,
        image:n_image,
        desc:n_desc,
     };
    }else{
      var newsposts = {
        name:n_name,
        desc:n_desc,
     };
    }
    post.findByIdAndUpdate(req.params.post_id,newsposts,
      function(err) {
        if (err) {
          req.flash('error', 'Post was not found');
          res.redirect('back');
        } else {
          req.flash('success', 'Post was updated');
          res.redirect('/edu/post/' + req.params.post_id);
        }
      });
  });

// delete

router.delete('/post/:post_id', middleware.postOwner,
  function(req, res) {
    post.findByIdAndRemove(req.params.post_id, function(err,fondpost) {
      if (err) {
        req.flash('error', 'Post was not found');
        res.redirect('back');
      } else {
        const imagePath = './public/uploads/' + fondpost.image;
        fs.unlink(imagePath, function(err){
          if(err){
              console.log(err);
              res.redirect('/tarot');
          }
      })
        req.flash('error', 'Post was deleted');
        res.redirect('/edu/comunity');
      }
    });
  }
);


router.get("/learning", function(req, res){
  var learning = null;
  learn.find().sort({_id: -1}).exec(function (err, alllearn){
      if (err){
          console.log(err);
      }else {
          res.render("socials/learningbox", {learn:alllearn, learning: null})
      }
  })
});
router.get("/learning/:learn_id",middleware.isLoggedIn,function(req,res){
  learn.findById(req.params.learn_id).exec(function(error,idlearn){
      if(error){
          console.log("error3636");      
      }else{
          res.render("socials/showlearning",{learn:idlearn});
      }
  });
});

router.get("/departments", function(req, res){
  var departmenting = null;
  department.find().sort({_id: -1}).exec(function (err, alldepartment){
      if (err){
          console.log(err);
      }else {
          res.render("socials/departments", {department:alldepartment, departmenting: null})
      }
  })
});
router.get("/departments/:department_id",middleware.isLoggedIn,function(req,res){
  department.findById(req.params.department_id).exec(function(error,iddepartment){
      if(error){
          console.log("error3636");      
      }else{
          res.render("socials/showdepartment",{department:iddepartment});
      }
  });
});

module.exports =router;
