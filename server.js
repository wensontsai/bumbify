//////////////////////
// Module Dependencies
//////////////////////
var express = require('express');
var io = require('socket.io');
var http = require('http');
var port = process.env.PORT || 3030;

var app = express();
var server = http.createServer(app);
io = io.listen(server);

// socket.io ////////
var socket_run = require('./sockets/base');
socket_run.runIO(io);


var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var flash = require('connect-flash');
var session = require('express-session');




////////////////////////////////////////
///////// db connect  //////////////////
////////////////////////////////////////
var Mongoose = require('mongoose');
var db = Mongoose.createConnection(process.env.MONGOLAB_URI || 'mongodb://localhost/bumbify',
        function(err){
            if(err){
                console.log('connection error', err);
            } else {
                console.log('connection successful');
            }
        });


var ScraperSchema = require('./models/Scraper.js').ScraperSchema;
var Scraper = db.model('scraper', ScraperSchema);

var SearchHistorySchema = require('./models/SearchHistory.js').SearchHistorySchema;
var SearchHistory = db.model('searchhistory', SearchHistorySchema);

var UserSchema = require('./models/User.js').UserSchema;
var User = db.model('user', UserSchema);

var FavoriteSchema = require('./models/Favorite.js').FavoriteSchema;
var Favorite = db.model('favorite', FavoriteSchema);

var UsedGifSchema = require('./models/UsedGif.js').UsedGifSchema;
var UsedGif = db.model('used_gif', UsedGifSchema);

var ChatSessionSchema = require('./models/ChatSession.js').ChatSessionSchema;
var ChatSession = db.model('chat_session', ChatSessionSchema);

var ChatLineSchema = require('./models/ChatLine.js').ChatLineSchema;
var ChatLine = db.model('chat_line', ChatLineSchema);


/////////////////////
// view engine setup
// all environments
/////////////////////
// app.set('port', process.env.PORT || 3030);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// /////////////////////
// // PASSPORT.JS  ////
// ////////////////////
// // Configuring Passport
// var passport = require('passport');
// // var expressSession = require('express-session');

// // TODO - Why Do we need this key ?
// // app.use(expressSession({secret: 'mySecretKey'}));
// app.use(passport.initialize());
// app.use(passport.session());

// // Using the flash middleware provided by connect-flash to store messages in session
//  // and displaying in templates
// var flash = require('connect-flash');
// app.use(flash());

// // Initialize Passport
// var initPassport = require('./passport/init');
// initPassport(passport);



var routes = require('./routes/index');

/////////////////////
// AngularJS  ROUTING
/////////////////////
app.post('/api/signup', routes.createUser(User));
app.post('/api/login', routes.login(User));

app.get('/api/scrapes', routes.showScrapes(Scraper));

app.post('/api/searchGifs', routes.searchGifs(Scraper, SearchHistory));
app.get('/api/searchHistory', routes.showHistory(SearchHistory));

app.post('/api/getAllFavorites', routes.queryAllFavorites(Favorite));
app.post('/api/addFavorite', routes.addFavorite(Favorite));
app.post('/api/deleteFavorite', routes.deleteFavorite(Favorite));

app.post('/api/storeUsedGif', routes.storeUsedGif(UsedGif));
app.post('/api/getRecents', routes.showRecentUsedGifs(UsedGif));

app.post('/api/getChatSession', routes.showChatSession(ChatSession));
app.post('/api/createChatSession', routes.createChatSession(ChatSession));

app.post('/api/addChatLine', routes.addChatLine(ChatLine));




//======================================================//
////////   catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



// server + listening port
server.listen(port);
console.log('Express server listening on port ' + port);
