const post = require('../models/post'),
  comment = require('../models/comment'),
  errMessage = 'You can only make changes to the experiences which you added';

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error', 'Kindly Log in First');
    res.redirect('/login');
  }
};

middlewareObj.postOwner = function(req, res, next) {
  if (req.isAuthenticated()) {
    post.findById(req.params.post_id, function(err, foundpost) {
      if (err) {
        req.flash('error', 'Travel diary was not found');
        res.redirect('back');
      } else if (foundpost.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash('error', errMessage);
        res.redirect('back');
      }
    });
  } else {
    req.flash('error', 'Kindly Log in First');
    res.redirect('/login');
  }
};

middlewareObj.CommentOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
      comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
          console.log(err);
          // req.flash('error', 'Comment was not found');
        } else if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You can only make changes to a comment you added');
          res.redirect('back');
        }
      });
    } else {
      req.flash('error', 'Kindly Log in First');
      res.redirect('/login');
    }
  };


module.exports = middlewareObj;