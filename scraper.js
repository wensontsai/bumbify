var cheerio = require('cheerio');
var request = require('request');
var urls = [];

request('http://giphy.com/search/fistbump', function(err, resp, body){
    if(!err && resp.statusCode == 200){
      var $ = cheerio.load(body);
      $('img.gifs-gif', '#searchresults').each(function(i, element){
        var url = $(element).attr('src');
        urls.push(url);
        console.log(url);
      });
    }
});


// request('http://www.reddit.com', function(err, resp, body){
//   if(!err && resp.statusCode == 200){
//     var $ = cheerio.load(body);
//     $('a.title', '#siteTable').each(function(){
//       var url = this.attr('href');
//       urls.push(url);
//     });
//     console.log(urls);
//   }
// });
