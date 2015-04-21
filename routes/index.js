/*
 * GET home page.
 */



exports.index = function(Scraper) {
  return function(req, res) {
    Scraper.find({}, function(error, scrapes) {
      res.render('index', {
        title: 'Express',
        scrapes : scrapes
      });
    });
  };
};

// exports.addTodo = function(Todo) {
//   return function(req, res) {
//     var todo = new Todo(req.body);
//     todo.save(function(error, todo) {
//     });
//   };
// };

// exports.get = function(Todo) {
//   return function(req, res) {
//     Todo.find({}, function(error, todos) {
//       res.json({ todos : todos });
//     });
//   }
// };

// exports.update = function(Todo) {
//   return function(req, res) {
//     Todo.findOne({ _id : req.params.id }, function(error, todo) {
//       if (error || !todo) {
//         res.json({ error : error });
//       } else {
//         todo.done = req.body.done;
//         todo.save(function(error, todo) {
//           if (error || !todo) {
//             res.json({ error : error });
//           } else {
//             res.json({ todo : todo });
//           }
//         });
//       }
//     });
//   }
// };
