var cheerio = require('cheerio');
var request = require('request');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt');
var passport = require('passport');


function clearDB(Scraper){
  // clear out old urls
  Scraper.remove().exec();
  console.log('removing all current docs from collection -> scraper');
}


function saveSearch(tag, SearchHistory){
  console.log("i save the search params here - " +tag);
   search = new SearchHistory({
        tag : tag,
        user : "pizzaMOMMA"
      });
   search.save();
}



// GET reqs //
exports.showScrapes = function(Scraper){
  return function(req, res, next){
    Scraper.find(function(error, scrapes){
      if(error) return console.error(error);
      // console.dir(scrapes);
      res.send(scrapes);
    });
  };
};


exports.showHistory = function(SearchHistory){
  return function(req, res, next){
    SearchHistory.find(function(error, searches){
      if(error) return console.error(error);
      // console.dir(scrapes);
      res.send(searches);
    });
  };
};



// POST reqs //
exports.searchGifs = function(Scraper, SearchHistory){
    var urls = [];
    var tag = '';
    var status = '';

    return function(req, res, next){
      var tag = req.body.tag;

      saveSearch(tag, SearchHistory);

    //wrap this in a success function
    request('http://giphy.com/search/' + tag, function(err, resp, body){
        if(!err && resp.statusCode == 200){
          var $ = cheerio.load(body);
          if ($('img.gifs-gif', '#searchresults').length > 0){
            $('img.gifs-gif', '#searchresults').each(function(i, element){
              var url = $(element).attr('src');

              urls.push(url);
              status = "success";

            });
            addScrapedUrls(urls, tag);

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

    function addScrapedUrls(urls, tag){
      clearDB(Scraper);

      // populate with latest scrape urls
      for (var i=0; i < urls.length; i++){
        // var cleanUrl = urls[i].replace(/.*?:\/\//g, "");
        var cleanUrl = urls[i];
        console.log("inserting url " + cleanUrl.replace('_s', '') + " into DB");
        scraped_data = new Scraper({
          url : cleanUrl.replace('_s', ''),
          tag : tag,
          used : "no"
        });
        scraped_data.save();
      };
    };
};




// USER AUTHENTICATION

// Generates hash using bCrypt
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};




exports.createUser = function(User){
  return function(req, res, next) {
    console.log("inside createUser!");

    // find a user in Mongo with provided username
    User.findOne({ 'name' :  req.body.name }, function(err, user) {
        // In case of any error, return using the done method
        if (err){
          console.log('Error in SignUp: '+err);
          res.send(401);
        }

        // already exists
        if(user){
          console.log('User already exists with username: '+req.body.name);
          res.send(401);
        } else {
          var user = new User({
            name : req.body.name,
            email : req.body.email,
            password : createHash(req.body.password)
          });
          console.log(user);

          user.save(function(error, user){
            if(error) return console.error(error);
            console.dir(user);
            res.send(user);
          });
          console.dir(user._id);
        }
    });

  };
};



exports.login = function(User){
  return function(req, res, next){
    console.log("inside login func!");

    // find a user in Mongo with provided username
    User.findOne({ 'name' :  req.body.name }, function(err, user) {
        // In case of any error, return using the done method
        if (err){
          res.send(401);
        }
        // Username does not exist, log the error and redirect back
        if (!user){
            console.log('User Not Found with username '+req.body.name);
        } else if (!isValidPassword(user, req.body.password)){
        // User exists but wrong password, log the error
            console.log('Invalid Password');
            res.send(401);
        } else {
        // User and password both match, return user from done method
        // which will be treated like success
          res.send(user);
        }

    });

    var isValidPassword = function(user, password){
      return bCrypt.compareSync(password, user.password);
    };

  };
};

