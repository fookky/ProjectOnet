const user = require('../models/user');

const post = require('../models/post'),
  comment = require('../models/comment'),
  learn = require("../models/learn")
  errMessage = 'You can only make changes to the experiences which you added';

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error', ' Log in First');
    res.redirect('/login');
  }
};

middlewareObj.postOwner = function(req, res, next) {
  if (req.isAuthenticated()) {
    post.findById(req.params.post_id, function(err, foundpost) {
      if (err) {
        req.flash('error', 'Post was not found');
        res.redirect('back');
      } else if (foundpost.author.id.equals(req.user._id) || req.user.isAdmin) {
        next();
      } else {
        req.flash('error', errMessage);
        res.redirect('back');
      }
    });
  } else {
    req.flash('error', ' Log in First');
    res.redirect('/login');
  }
};
middlewareObj.adminlearnOwner = function(req, res, next) {
  if (req.isAuthenticated()) {
    learn.findById(req.params.learn_id, function(err, foundlearn) {
      if (err) {
        req.flash('error', 'Post was not found');
        res.redirect('back');
      } else if (foundlearn.author.id.equals(req.user._id) || req.user.isAdmin) {
        next();
      } else {
        req.flash('error', errMessage);
        res.redirect('back');
      }
    });
  } else {
    req.flash('error', ' Log in First');
    res.redirect('/login');
  }
};

middlewareObj.CommentOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
      comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
          console.log(err);
          // req.flash('error', 'Comment was not found');
        } else if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
          next();
        } else {
          req.flash('error', 'You can only make changes to a comment you added');
          res.redirect('back');
        }
      });
    } else {
      req.flash('error', ' Log in First');
      res.redirect('/login');
    }
  };

  middlewareObj.isAdmin = function(req, res, next) {
    if(req.user.isAdmin) {
      next();
    } else {
      req.flash('error', 'You don\'t have access to that');
      res.redirect('back');
    }
  }


module.exports = middlewareObj;