// RECENT USED GIF TRACKING //
exports.storeUsedGif = function(UsedGif){
    return function(req, res, next) {
      // console.log("inside storeUsedGif ");
      // console.log(req.body);

      UsedGif.findOne({ 'url' :  req.body.url, 'userId' : req.body.userId }, function(err, used_gif) {
          // In case of any error, return using the done method
          if (err){
            // console.log('Error in adding Favorite: '+err);
            res.send(401);
          }

          // already exists
          if(used_gif){
            // console.log('this favorite already exists for url: '+req.body.url);
            status = "exists";
            // res.send(status);
          // delete existing one then store, so it comes to top
            UsedGif.remove({'url' :  req.body.url, 'userId' : req.body.userId }, function(err,removed) {
            });

            var usedGif = new UsedGif({
                  user : req.body.user,
                  userId : req.body.userId,
                  url : req.body.url,
                  tag : req.body.tag,
                  // timestamp : req.body.timestamp
                });

            usedGif.save(function(error, usedGif){
              if(error) return console.error(error);
              console.dir(usedGif);
              res.send(usedGif);
            });

          } else {
            // store used Gif
            var usedGif = new UsedGif({
                  user : req.body.user,
                  userId : req.body.userId,
                  url : req.body.url,
                  tag : req.body.tag
                  // timestamp : req.body.timestamp
                });

            usedGif.save(function(error, usedGif){
              if(error) return console.error(error);
              console.dir(usedGif);
              res.send(usedGif);
            });
          };
      });
    };
};

exports.showRecentUsedGifs = function(UsedGif){
  return function(req, res, next){

    var callback = function(error, recents){
      // console.log(recents);
      if(error) return console.error(error);
      res.send(recents);
    };

    UsedGif
      .find({ 'userId' : req.body.userId })
      .sort({'time':'descending'})
      .limit(25)
      .exec(callback);
  };
};
