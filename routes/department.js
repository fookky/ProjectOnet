const express = require("express"),
      router = express.Router(),
      multer = require("multer"),
      path = require("path"),
      fs = require("fs"),
      department = require("../models/department"),
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
    department.find({},function(error,alldepartment){
         if(error){
            console.log(err);
       }else{
            console.log(alldepartment);
            res.render("department/department",{department:alldepartment});
            
        }
 })
 });


router.get("/add",function(req,res){
    res.render("department/new");
    });

router.post("/",upload.single("image") ,function(req,res){
    let n_name = req.body.name;
    let n_image = req.file.filename;
    let n_desc = req.body.desc;
    let n_subject = req.body.subject;
    let author = {
      id: req.user._id,
      username: req.user.username
        };
        let newsposts = {
            name:n_name,
            image:n_image,
            desc:n_desc,
            subject:n_subject,
            author: author,
      
            };
            console.log(newsposts);
            department.create(newsposts,function(error,newdepartment){
              if(error){
                  console.log(error);
              }else{
                   console.log("add new");
                   res.redirect("/admin/department");
              };
          })
       });

router.get('/delete/:department_id',
 function(req, res) {
    department.findByIdAndDelete(req.params.department_id, function(err) {
     if (err) {
       req.flash('error', 'department was not found');
       next(err);
     } else {
       req.flash('error', 'department was deleted');
       res.redirect('/admin/department');
     }
   });
 }
);

// edit
router.get('/:department_id/edit',
  function(req, res) {
    department.findById(req.params.department_id, function(err, founddepartment) {
      if (err) {
        req.flash('error', 'department was not found');
        res.redirect('back');
      } else {
        console.log(founddepartment);
        res.render('department/edit', {
            department: founddepartment
        });
      }
    });
  }
);

// update

router.put('/:department_id', upload.single('image'),
  function(req, res) {
    let n_name = req.body.name;
    let n_desc = req.body.desc;
    let n_subject = req.body.subject;
    if(req.file){
      let n_image = req.file.filename;
      department.findByIdAndUpdate(req.params.department_id,function(err,fonddepartment){
        if(err){
          req.flash('error', 'Comment was not found');
          res.redirect('/admin');
        }else{
          const imagePath = "./public/uploads/" + fonddepartment.image;
          fs.unlink(imagePath,function(err){
            if(err){
              console.log(err);
              res.redirect('/admin/department');
          }
          })
        }
      })
      var newsposts = {
        name:n_name,
        image:n_image,
        desc:n_desc,
        subject:n_subject,
     };
    }else{
      var newsposts = {
        name:n_name,
        desc:n_desc,
        subject:n_subject,
     };
    }
    department.findByIdAndUpdate(req.params.department_id,newsposts,
      function(err) {
        if (err) {
          req.flash('error', 'Post was not found');
          res.redirect('back');
        } else {
          req.flash('success', 'Post was updated');
          res.redirect('/admin/department/' );
        }
      });
  });

module.exports = router;