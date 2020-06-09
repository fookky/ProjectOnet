const express = require("express"),
      mongoose = require("mongoose"),
      bodyPaerser = require("body-parser"),
      passport = require("passport"),
      passportLocal = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      User = require("./models/user");
      post = require("./models/post");
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

app.get("/edu/comunity",isLoggedIn,function(req,res){
    post.find({},function(error,allpost){
        if(error){
            console.log("error-------");
        }else{
            res.render("social",{post:allpost});
        };
    });
});
app.post("/edu/comunity",isLoggedIn,function(req,res){
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
 app.get("/post/:id",isLoggedIn,function(req,res){
    post.findById(req.params.id,function(error,idpost){
        if(error){
            console.log("error3636");      
        }else{
            res.render("showdetail",{post:idpost});
        }
    });
});
//---authen-----
app.get("/",function(req,res){
    res.render("main");
});
app.get("/thaiquiz",function(req,res){
    res.render("thaiquize");
});
app.get("/review",function(req,res){
    res.render("reviewdepart");
});
app.get("/edu",isLoggedIn,function(req,res){
    res.render("index");
});
app.get("/edu/comunity",isLoggedIn,function(req,res){
    res.render("social");
});
app.get("/edu/post",isLoggedIn,function(req,res){
    res.render("addpost");
});

app.get("/edu/quiz",isLoggedIn,function(req,res){
     res.render("quizeonet");
});

app.get("/login",function(req,res){
    res.render("login");
});
app.post("/login",passport.authenticate("local" ,{
    successRedirect: '/edu',
    failureRedirect: 'login'
}),function(req,res){
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect('/');
});


app.get("/signup",function(req,res){
    res.render("signup");
});
app.post("/signup",function(req,res){
    User.register(new User({username:req.body.username,firstname: req.body.firstname,Surname:req.body.Surname,mail:req.body.mail,School:req.body.School,Level:req.body.Level }),req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/edu");
        });
    });
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

app.listen(3000,function(req,res){
    console.log("colection ready!");
    });