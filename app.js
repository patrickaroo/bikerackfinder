
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , search = require('./routes/search')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();
mongoose.connect('localhost', 'rackdata');

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/findRacksByLoc', search.byLoc);
app.get('/findRacksByAddress', search.byAddress);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  process.setgid(1001);
  process.setuid(1001);
});
