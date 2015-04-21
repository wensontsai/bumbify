/*
 * GET home page.
 */

exports.index = function(Scraper) {
  return function(req, res) {
    Scraper.find({}, function(error, scrapes) {
      res.render('index', {
        title: 'Express',
        gifs : scrapes
      });
    });
  };
};


exports.getScrapes = function(Scraper){
  var query = Scraper.find();
  query.exec(function(err, data){
    if(err) return next (err);
    res.send(data);
  });
};


