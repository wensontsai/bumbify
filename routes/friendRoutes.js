// FRIENDS LIST & SEARCH //
exports.queryForFriend = function(User){
  return function(req, res, next){
    User.find({'name' : new RegExp('^'+req.body.friendName, "i")}, function(err, userSearch){
        if (err){
           res.send(401);
        }

      res.send(userSearch);
    });

  };
};

exports.showFriendsList = function(Friend){
  return function(req, res, next){

    var callback = function(error, friends){
      if(error) return console.error(error);
      res.send(friends);
    };

    Friend
      .find({ 'userId' : req.body.userId })
      // .sort({'time':'descending'})
      .exec(callback);
  };
};

exports.addFriend = function(Friend){
    return function(req, res, next) {
      // find a user in Mongo with provided username
      Friend.findOne({ 'friendName' :  req.body.friendName, 'friendId' :  req.body.friendId, 'userId' : req.body.userId }, function(err, friend) {
          // In case of any error, return using the done method
          if (err){
            res.send(401);
          }

          // already exists
          if(friend){
            status = "exists";
            res.send(status);
          } else {
            var friend = new Friend({
              user : req.body.user,
              userId : req.body.userId,
              friendName : req.body.friendName,
              friendId : req.body.friendId
            });

            friend.save(function(error, friend){
              if(error) return console.error(error);
              res.send(friend);
            });
          }
      });

    };
};

exports.deleteFriend = function(Friend){
    return function(req, res, next) {
      // find a user in Mongo with provided username
      Friend.remove({ 'friendId' :  req.body.friendId, 'userId' : req.body.userId }, function(err, friend) {
          // In case of any error, return using the done method
          if (err){
            // console.log('Error in adding Favorite: '+err);
            res.send(401);
          }

          res.send("friend successfully removed");
      });

    };
};


