const express = require("express"),
      mongoose = require("mongoose"),
      bodyPaerser = require("body-parser"),
      passport = require("passport"),
      passportLocal = require("passport-local"),
      cookieParser = require("cookie-parser"),
      methodOverride = require('method-override'),
      flash = require('connect-flash'),
      passportLocalMongoose = require("passport-local-mongoose"),
      User = require("./models/user"),
     post = require("./models/post"),
      
  //quiztopic = require("./models/quiztopic"),
  //quizquestion = require("./models/quizquestion"),
      seedDB = require("./seeds"),
      postRoutes = require("./routes/post"),
      adminRoutes = require("./routes/admin"),
      indexRoutes = require("./routes/index"),
      learnRoutes = require("./routes/learn"),
      departmentRoutes = require("./routes/department"),
   //quizRoutes = require("./routes/quiz"),
      commentsRoutes = require("./routes/comments");
  
var path = require('path');
const port = process.env.PORT || 3000;
// mongoose.set('useUnifiedTopology',true);
const MONGODB_URL ="mongodb+srv://fookky:fookky21841@project-oqg67.mongodb.net/project?retryWrites=true&w=majority";
mongoose.connect( MONGODB_URL , {useNewUrlParser: true});
mongoose.connection.on("connected",()=>{
    console.log("mongoose connect");
} );
// mongoose.set('useCreateIndex',true);
// mongoose.set('useFindAndModify',false);


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
    res.locals.user = req.user;
    next();
});
app.use(cookieParser('secret'));

app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/",indexRoutes);
app.use("/admin",adminRoutes);
app.use("/admin/learn",learnRoutes);
app.use("/admin/department",departmentRoutes);
//app.use("/admin/quiz",quizRoutes);
app.use("/edu",postRoutes);
app.use("/edu/post/:post_id/comment",commentsRoutes);

// app.get('*',function(req,res,next){
//     res.locals.user = req.user || null;
//     res.locals.currentUser = req.user;
//     next();
// });

//seedDB();

app.listen(port,function(req,res){
    console.log("colection ready!");
    });
    