var cheerio = require('cheerio');
var request = require('request');
var urls = [];


////////////////////////////////////////
///////// db connect  //////////////////
////////////////////////////////////////
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('mongodb://localhost/bumbify',
        function(err){
            if(err){
                console.log('connection error', err);
            } else {
                console.log('connection successfull');
            }
        });


var ScraperSchema = require('./models/Scraper.js').ScraperSchema;
var Scraper = db.model('scraper', ScraperSchema);




//wrap this in a success function
request('http://giphy.com/search/sex', function(err, resp, body){
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




