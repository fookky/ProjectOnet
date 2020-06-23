const express = require("express"),
      router = express.Router(),
      quiztopic = require("../models/quiztopic"),
      quizquestion = require("../models/quizquestion"),
      middleware = require("../middleware");


router.get("/add",function(req,res){
    res.render("quiz/addnewQuiz");
});

router.post("/",middleware.isLoggedIn,function(req,res){
    let n_nametopic = req.body.nametopic;
    let n_desctopic = req.body.desctopic;
    let quizto = {
         nametopic:n_nametopic,
         desctopic:n_desctopic
      };
    quiztopic.create(quizto,function(error,newtopic){
        if(error){
            console.log(error);
        }else{
             console.log("add new topic");
             res.redirect("/admin/quiz");
        };
    })
 });

 router.get("/",middleware.isLoggedIn,function(req,res){
    quiztopic.find({},function(error,allquiz){
         if(error){
            console.log("error-------");
       }else{
            
            res.render("quiz/quiz",{quizall:allquiz});
            
        }
 })
 });

 router.get('/delete/:quiztopic_id', middleware.isLoggedIn,
 function(req, res) {
    quiztopic.findByIdAndDelete(req.params.quiztopic_id, function(err) {
     if (err) {
       req.flash('error', 'post was not found');
       next(err);
     } else {
       req.flash('error', 'post was deleted');
       res.redirect('/admin/quiz');
     }
   });
 }
);

router.get("/view/:quiztopic_id",middleware.isLoggedIn,function(req,res){
  quizquestion.findById(req.params.quizquestion_id).populate("quizquestions").exec(function(error,idquiz){
      if(error){
          console.log(error);      
      }else{
        console.log(idquiz);
          res.render("quiz/quizview",{quizquestion:idquiz});
      }
  });
});

router.get("/view/:quizquestion_id/createquestion/new",middleware.isLoggedIn,function(req,res){
  console.log(req.params.id);
  quizquestion.findById(req.params.quizquestion_id, function(err,quiztopic){
      if(err){
          console.log(err);
      }else{
          res.render("quiz/createQuestion",{quizquestion:quiztopic});
      }
  });
});


router.post("/view/:quiztopic_id/createquestion",middleware.isLoggedIn,function(req,res){
  quiztopic.findById(req.params.quiztopic_id,function(err,quiztopic){
      if(err){
          req.flash("error", "fail");
      }else{
        quizquestion.create(req.body.quizquestion,function(err,quizquestion){
              if(err){
                  console.log(err);
              }else{
                quizquestion.save();
                quiztopic.quizquestions.push(quizquestion);
                  quiztopic.save();
                  req.flash("success", "quiz was added");
                  
                  // post.comments.push(comment);
                  // post.save();
                   res.redirect("/admin/quiz/view/" + quiztopic._id);        
              }
          });
      }
  });
});


module.exports = router;