var cheerio = require('cheerio');
var request = require('request');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User.js');
var bCrypt = require('bcrypt');
var passport = require('passport');



// GIF SEARCH /////////////
function clearDB(Scraper, userId){
  // clear out old urls
  Scraper.remove({ 'userId' :  userId }).exec();
  // console.log('removing all current docs from collection -> scraper where userID = ' +userId);
}

function saveSearch(tag, user, userId, SearchHistory){
  // console.log("i save the search params here - " +tag+ " by: " +userId);
      search = new SearchHistory({
        tag : tag,
        user : user,
        userId : userId
      });
   // console.dir(search);

   search.save();
}

exports.showScrapes = function(Scraper){
  return function(req, res, next){
    console.dir(req.body.userId);
    Scraper.find({ 'userId' :  req.body.userId }, function(err, scrapes) {
        // console.dir("mah gootuhniss");
        if(scrapes){
          // console.dir(scrapes);
          res.send(scrapes);
        } else {
          res.send('first timer!!');
        }
    });
  };
};

exports.showHistory = function(SearchHistory){
  return function(req, res, next){
    // ALL HISTORY
    // SearchHistory.find(function(error, searches){
    //   if(error) return console.error(error);
    //   // console.dir(scrapes);
    //   res.send(searches);
    // });

    // TOP MOST RECENT 50 SEARCHES
    var callback = function(error, searches){
      // console.log(searches);
      if(error) return console.error(error);

      res.send(searches);
    };

    SearchHistory
      .find({})
      .sort({'time':'descending'})
      .limit(50)
      .exec(callback);

  };
};

exports.searchGifs = function(Scraper, SearchHistory){
    var urls = [];
    var tag = '';
    var user = '';
    var status = '';

    return function(req, res, next){
      var tag = req.body.tag;
      var user = req.body.user;
      var userId = req.body.userId;

      console.dir(req.body);

    // scrape query
    request('http://giphy.com/search/' + tag, function(err, resp, body){
        if(!err && resp.statusCode == 200){
          var $ = cheerio.load(body);
          if ($('img.gifs-gif', '#searchresults').length > 0){
            $('img.gifs-gif', '#searchresults').each(function(i, element){
              var url = $(element).attr('src');

              urls.push(url);
              status = "success";

            });
            addScrapedUrls(urls, tag, user, userId);
            saveSearch(tag, user, userId, SearchHistory);

            // clear urls array so next search is that search only
            urls=[];
          } else {
            status = "fail";
            addScrapedUrls(urls);
          }
        res.send(status);
        }
      });
    };

    function addScrapedUrls(urls, tag, user, userId){
      clearDB(Scraper, userId);

      // populate with latest scrape urls
      for (var i=0; i < urls.length; i++){
        // var cleanUrl = urls[i].replace(/.*?:\/\//g, "");
        var cleanUrl = urls[i];
        scraped_data = new Scraper({
          url : cleanUrl.replace('_s', ''),
          tag : tag,
          user : user,
          userId : userId
        });
        // console.dir(scraped_data);
        scraped_data.save();
        // console.log("inserting url " + cleanUrl.replace('_s', '') + " into DB");
      };
    };
};




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













// for persisting chatroom
exports.showChatSession = function(ChatSession){
  return function(req, res, next){

      console.dir(req.body);

      // ChatSession.findOne({ '_id' :  req.body }, function(error, chatSession){
      //   if(error) return console.error(error);
      //   // console.dir(scrapes);
      //   res.send(chatSession);
      // });
    };
};

exports.createChatSession = function(ChatSession){
  return function(req, res, next){
      var chatSession = new ChatSession();

      chatSession.save(function(error, chatSession){
        if(error) return console.error(error);
        res.send(chatSession);
      });
  };
};

exports.addChatLine = function(ChatLine){
  return function(req, res, next){
      console.log(req.body);

      var chatLine = new ChatLine({
        chatSession : req.body.sessionId,
        url : req.body.url,
        text : req.body.text,
        user: req.body.user,
        timestamp: req.body.timestamp
      });

      chatLine.save(function(error, chatLine){
        if(error) return console.error(error);
        res.send(chatLine);
      });
  };
};

