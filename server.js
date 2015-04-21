//////////////////////
// Module Dependencies
//////////////////////
var http = require('http')
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();


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


///////////////////////
// SCRAPER ////////////
///////////////////////
var scraper_logic = require('./scraper.js');




/////////////////////
// view engine setup
// all environments
/////////////////////
app.set('port', process.env.PORT || 3030);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




/////////////////////
// AngularJS  ROUTING
/////////////////////

app.get('/', routes.index(Scraper));
app.get('/api/all_scrapes', routes.getScrapes(Scraper));
// app.get('*', routes.index(Scraper));






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
http.createServer(app).listen(3030);
console.log('Express server listening on port ' + app.get('port'));
