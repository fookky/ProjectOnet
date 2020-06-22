const express = require("express"),
      router = express.Router(),
      multer = require("multer"),
      path = require("path"),
      fs = require("fs"),
      learn = require("../models/learn"),
      middleware = require("../middleware"),
       user = require("../models/user");

const storage = multer.diskStorage({
destination: './public/uploads',
    filename: function(req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
      });
      
const imageFilter = function(req, file, cb){
    var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.gif' && ext !== '.jpg' && ext !== '.jpeg' ){
            return cb(new Error("err"), false)
            }
            cb(null, true);
    };
      
const upload = multer({storage: storage, fileFilter: imageFilter})

router.get("/",function(req,res){
    learn.find({},function(error,alllearn){
         if(error){
            console.log(err);
       }else{
            console.log(alllearn);
            res.render("learning/learn",{learn:alllearn});
            
        }
 })
 });


router.get("/add",function(req,res){
    res.render("learning/new");
    });

router.post("/",upload.single("image") ,function(req,res){
    let n_name = req.body.name;
    let n_image = req.file.filename;
    let n_desc = req.body.desc;
    let n_subject = req.body.subject;
    let n_type = req.body.type;
    let author = {
      id: req.user._id,
      username: req.user.username
        };
        let newsposts = {
            name:n_name,
            image:n_image,
            desc:n_desc,
            subject:n_subject,
            type:n_type,
            author: author,
      
            };
            console.log(newsposts);
            learn.create(newsposts,function(error,newpost){
              if(error){
                  console.log(error);
              }else{
                   console.log("add new");
                   res.redirect("/admin/learn");
              };
          })
       });

router.get('/delete/:learn_id',
 function(req, res) {
    learn.findByIdAndDelete(req.params.learn_id, function(err) {
     if (err) {
       req.flash('error', 'คลังข้อมูล was not found');
       next(err);
     } else {
       req.flash('error', 'คลังข้อมูล was deleted');
       res.redirect('/admin/learn');
     }
   });
 }
);

// edit
router.get('/:learn_id/edit',
  function(req, res) {
    learn.findById(req.params.learn_id, function(err, foundlearn) {
      if (err) {
        req.flash('error', 'learn was not found');
        res.redirect('back');
      } else {
        console.log(foundlearn);
        res.render('learning/edit', {
          learn: foundlearn
        });
      }
    });
  }
);

// update

router.put('/:learn_id', upload.single('image'),
  function(req, res) {
    let n_name = req.body.name;
    let n_desc = req.body.desc;
    let n_subject = req.body.subject;
    let n_type = req.body.type;
    if(req.file){
      let n_image = req.file.filename;
      learn.findByIdAndUpdate(req.params.learn_id,function(err,fondlearn){
        if(err){
          req.flash('error', 'Comment was not found');
          res.redirect('/admin');
        }else{
          const imagePath = "./public/uploads/" + fondlearn.image;
          fs.unlink(imagePath,function(err){
            if(err){
              console.log(err);
              res.redirect('/admin/learn');
          }
          })
        }
      })
      var newsposts = {
        name:n_name,
        image:n_image,
        desc:n_desc,
        subject:n_subject,
        type:n_type,
     };
    }else{
      var newsposts = {
        name:n_name,
        desc:n_desc,
        subject:n_subject,
        type:n_type,
     };
    }
    learn.findByIdAndUpdate(req.params.learn_id,newsposts,
      function(err) {
        if (err) {
          req.flash('error', 'Post was not found');
          res.redirect('back');
        } else {
          req.flash('success', 'Post was updated');
          res.redirect('/admin/learn/' );
        }
      });
  });

module.exports = router;