var request = require('request');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User.js');
var bCrypt = require('bcrypt');
var passport = require('passport');


// USER AUTHENTICATION  ////////////

// Generates hash using bCrypt
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

exports.createUser = function(User){
  return function(req, res, next) {
    // find a user in Mongo with provided username
    User.findOne({ 'name' :  req.body.name }, function(err, user) {
        // In case of any error, return using the done method
        if (err){
          // console.log('Error in SignUp: '+err);
          res.send(401);
        }

        // already exists
        if(user){
          // console.log('User already exists with username: '+req.body.name);
          status = "exists";
          res.send(status);
        } else {
          var user = new User({
            name : req.body.name,
            email : req.body.email,
            password : createHash(req.body.password)
          });
          // console.log(user);

          user.save(function(error, user){
            if(error) return console.error(error);
            console.dir(user);
            res.send(user);
          });
        }
    });

  };
};

exports.login = function(User){
  return function(req, res, next){
    // find a user in Mongo with provided username
    User.findOne({ 'name' :  req.body.name }, function(err, user) {
        // In case of any error, return using the done method
        if (err){
          res.send(401);
        }
        // Username does not exist, log the error and redirect back
        if (!user){
            // console.log('User Not Found with username '+req.body.name);
            status = "username failed";
            res.send(status);
        } else if (!isValidPassword(user, req.body.password)){
        // User exists but wrong password, log the error
            // console.log('Invalid Password');
            status = "password failed";
            res.send(status);
        } else {
        // User and password both match, return user from done method
        // which will be treated like success
          // console.dir(user);
          res.send(user);
        }

    });

    var isValidPassword = function(user, password){
      return bCrypt.compareSync(password, user.password);
    };

  };
};





