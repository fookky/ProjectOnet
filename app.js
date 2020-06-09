const express = require("express"),
      mongoose = require("mongoose"),
      bodyPaerser = require("body-parser"),
      passport = require("passport"),
      passportLocal = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      User = require("./models/user"),
      post = require("./models/post"),
      postRoutes = require("./routes/post"),
      indexRoutes = require("./routes/index");
var path = require('path');

mongoose.connect('mongodb://localhost:27017/edupro', {useNewUrlParser: true});

let app = express();

app.set("view engine","ejs");
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
    next();
});

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoutes);
app.use(postRoutes);



app.listen(3000,function(req,res){
    console.log("colection ready!");
    });