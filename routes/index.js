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




// AUTH shit
// Generates hash using bCrypt
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};


exports.createUser = function(User, formInfo){
  return function(req, res, next){
    var user = new User(req.body);
    console.dir(user._id);
    user.save(function(error, user){
      if(error) return console.error(error);
      console.dir(user);
      res.send(user);
    });
  };
};

exports.login = function(User, formInfo){
  return function(req, res, next){
    User.findOne({ 'username' :  username },
        function(err, user) {
            // In case of any error, return using the done method
            if (err)
                return done(err);
            // Username does not exist, log the error and redirect back
            if (!user){
                console.log('User Not Found with username '+username);
                return done(null, false, req.flash('message', 'User Not found.'));
            }
            // User exists but wrong password, log the error
            if (!isValidPassword(user, password)){
                console.log('Invalid Password');
                return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
            }
            // User and password both match, return user from done method
            // which will be treated like success
            return done(null, user);
        }
    );
    var isValidPassword = function(user, password){
      return bCrypt.compareSync(password, user.password);
    };
  };
};

exports.signup = function(User, formInfo){
  return function(req, res, next){
    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      User.findOne({ 'username' :  username }, function(err, user) {
          // In case of any error, return using the done method
          if (err){
              console.log('Error in SignUp: '+err);
              return done(err);
          }
          // already exists
          if (user) {
              console.log('User already exists with username: '+username);
              return done(null, false, req.flash('message','User Already Exists'));
          } else {
              // if there is no user with that email
              // create the user
              var newUser = new User();

              // set the user's local credentials
              newUser.username = username;
              newUser.password = createHash(password);
              newUser.email = req.param('email');
              newUser.firstName = req.param('firstName');
              newUser.lastName = req.param('lastName');

              // save the user
              newUser.save(function(err) {
                  if (err){
                      console.log('Error in Saving user: '+err);
                      throw err;
                  }
                  console.log('User Registration succesful');
                  return done(null, newUser);
              });
          }
        });
    };
    // Delay the execution of findOrCreateUser and execute the method
    // in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  };
};
