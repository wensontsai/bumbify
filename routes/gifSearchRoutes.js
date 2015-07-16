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


