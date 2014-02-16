
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(express.favicon(path.join(__dirname, 'app/img/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/api/races/list', api.listRaces);
app.post('/api/races/new', api.saveRace);
app.get('/api/races/:raceId', api.findRace);
app.delete('/api/races/:raceId', api.deleteRace);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
