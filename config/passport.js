const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({email: username}, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      return done(null, user);
    });
  }
));
