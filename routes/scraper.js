/*
 * GET home page.
 */


 //show scraped data


exports.index = function(Scraper) {
  return function(req, res) {
    Scraper.find({}, function(error, scrapes){
      res.render('index', {
        title: 'Bumbify',
        scrapes : scrapes
      });
    });
  };
};
