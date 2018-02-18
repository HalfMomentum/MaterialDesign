const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  // Local Strategy
  passport.use(new LocalStrategy(function(name, password, done){
    // Match name
    let query = {name:name};
    User.findOne(query, function(err, user){
      // console.log("User====",user);
      if(err) throw err;
      if(!user){
        console.log("No user found");
        return done(null, false, {message: 'No user found'});
      }

      // Match Password
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          // console.log(user);
          // window.localStorage.setItem("user",user);
          return done(null, user);
        } else {
          // console.log("Wrong Pass");
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}