const express = require("express"),
      mongoose = require("mongoose"),
      bodyPaerser = require("body-parser"),
      passport = require("passport"),
      passportLocal = require("passport-local"),
      methodOverride = require('method-override'),
      flash = require('connect-flash'),
      passportLocalMongoose = require("passport-local-mongoose"),
      User = require("./models/user"),
      post = require("./models/post"),
      seedDB = require("./seeds"),
      postRoutes = require("./routes/post"),
      adminRoutes = require("./routes/admin"),
      indexRoutes = require("./routes/index"),
      commentsRoutes = require("./routes/comments");
  
var path = require('path');

mongoose.connect('mongodb://localhost:27017/edupro', {useNewUrlParser: true});

let app = express();

app.set("view engine","ejs");

app.use(flash());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyPaerser.urlencoded({extended:true}));
app.use(require('express-session')({
    secret: 'CSS227',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/",indexRoutes);
app.use("/admin",adminRoutes);
app.use("/edu",postRoutes);
app.use("/edu/post/:post_id/comment",commentsRoutes);

seedDB();

app.listen(3000,function(req,res){
    console.log("colection ready!");
    });