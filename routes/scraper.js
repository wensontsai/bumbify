/*
 * GET home page.
 */


 //show scraped data
exports.showScrapes = function(ScrapedData) {
  return function(req, res) {
    ScrapedData.find({}. function(error, scrapedData) {
      res.render('index', {
        title: 'Bumbify',
        scrapedData : scrapedData
      });
    });
  };
};

