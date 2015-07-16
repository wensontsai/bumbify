// USER FAVORITES  //////////////
exports.queryAllFavorites = function(Favorite){
  return function(req, res, next) {
      // find a user in Mongo with provided username
      Favorite.find({ 'userId' : req.body.userId }, function(err, favorite) {
          // In case of any error, return using the done method
          if (err){
            // console.log('Error in adding Favorite: '+err);
            res.send(401);
          } else {
            res.send(favorite);
          }
      });
  };
};


// exports.queryFavoritesByTag = function(Favorite){
//   return function(req, res, next) {
//       console.log("inside favs by tag!");
//       console.log(req.body);

//       // find a user in Mongo with provided username
//       Favorite.find({ 'user' : req.body.user, 'tag' : req.body.tag }, function(err, favorite) {

//           res.send(favorite);

//       });
//   };

// };


exports.addFavorite = function(Favorite){
    return function(req, res, next) {
      // find a user in Mongo with provided username
      Favorite.findOne({ 'url' :  req.body.url, 'userId' : req.body.userId }, function(err, favorite) {
          // In case of any error, return using the done method
          if (err){
            // console.log('Error in adding Favorite: '+err);
            res.send(401);
          }

          // already exists
          if(favorite){
            // console.log('this favorite already exists for url: '+req.body.url);
            status = "exists";
            res.send(status);
          } else {
            var favorite = new Favorite({
              url : req.body.url,
              user : req.body.user,
              userId : req.body.userId,
              tag : req.body.tag
              // timestamp : req.body.timestamp
            });

            favorite.save(function(error, favorite){
              if(error) return console.error(error);
              res.send(favorite);
            });
          }
      });

    };
};

exports.deleteFavorite = function(Favorite){
    return function(req, res, next) {
      // find a user in Mongo with provided username
      Favorite.remove({ 'url' :  req.body.url, 'userId' : req.body.userId }, function(err, favorite) {
          // In case of any error, return using the done method
          if (err){
            // console.log('Error in adding Favorite: '+err);
            res.send(401);
          }

          res.send("gif successfully removed");
      });

    };
};
