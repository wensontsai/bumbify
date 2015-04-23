/*
 * GET home page.
 */



// exports.index = function(Scraper){
//   return function(req, res, next){
//     Scraper.find(function(error, scrapes){
//       if(error) return console.error(error);
//       console.dir(scrapes);
//       res.send(scrapes);
//     });
//   };
// };

exports.getScrapes = function(Scraper){
  return function(req, res, next){
    Scraper.find(function(error, scrapes){
      if(error) return console.error(error);
      console.dir(scrapes);
      res.send(scrapes);
    });
  };
};

exports.searchGifs = function(Scraper){
    var cheerio = require('cheerio');
    var request = require('request');

    var urls = [];
    var tag = 'love';

    //wrap this in a success function
    request('http://giphy.com/search/' + tag, function(err, resp, body){
        if(!err && resp.statusCode == 200){
          var $ = cheerio.load(body);
          $('img.gifs-gif', '#searchresults').each(function(i, element){
            var url = $(element).attr('src');
            urls.push(url);
          });
          addScrapedUrls(urls);
        }
    });

    function addScrapedUrls(urls){
      // clear out old urls
      console.log('removing all current docs from collection -> scraper');
      Scraper.remove().exec();

      // populate with latest scrape urls
      for (var i=0; i < urls.length; i++){
        console.log("inserting url " + urls[i].replace('_s', '') + " into DB");
        scraped_data = new Scraper({
          url : urls[i].replace('_s', ''),
          used : "no"
        });
        scraped_data.save();
      }
    };


  return function(req, res, next){
    Scraper.find(function(error, scrapes){
      if(error) return console.error(error);
      console.dir(scrapes);
      res.send(scrapes);
    });
  };
};




exports.createUser = function(User, formInfo){
  return function(req, res, next){
    var user = new User(req.body);
    user.save(function(error, user){
      if(error) return console.error(error);
      console.dir(user);
      res.send(user);
    });
  };
}
