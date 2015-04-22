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
