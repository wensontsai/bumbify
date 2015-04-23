var cheerio = require('cheerio');
var request = require('request');


// exports.index = function(Scraper){
//   return function(req, res, next){
//     Scraper.find(function(error, scrapes){
//       if(error) return console.error(error);
//       console.dir(scrapes);
//       res.send(scrapes);
//     });
//   };
// };
function clearDB(Scraper){
  // clear out old urls
  Scraper.remove().exec();
  console.log('removing all current docs from collection -> scraper');
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



// POST reqs //
exports.searchGifs = function(Scraper){
    var urls = [];
    var tag = '';
    var status = '';

    return function(req, res, next){
      var tag = req.body.tag;

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
            addScrapedUrls(urls);

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

    function addScrapedUrls(urls){
      clearDB(Scraper);

      // populate with latest scrape urls
      for (var i=0; i < urls.length; i++){
        console.log("inserting url " + urls[i].replace('_s', '') + " into DB");
        scraped_data = new Scraper({
          url : urls[i].replace('_s', ''),
          used : "no"
        });
        scraped_data.save();
      };
    };
};




// AUTH shit
exports.createUser = function(User, formInfo){
  return function(req, res, next){
    var user = new User(req.body);
    user.save(function(error, user){
      if(error) return console.error(error);
      console.dir(user);
      res.send(user);
    });
  };
};
